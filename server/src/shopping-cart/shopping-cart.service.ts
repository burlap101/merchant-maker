import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ShoppingCart } from './interfaces/shopping-cart.interface';
import { Model } from 'mongoose';
import { Product } from '../products/interfaces/product.interface';
import Stripe from 'stripe';
import keys from "../localconfig/keys";
import { TrainingSession } from './interfaces/training-session.interface';
import { ShippingMethod } from 'src/shipping/interfaces/shipping-method.interface';

const stripe = new Stripe(keys.stripe.privateKey, { apiVersion: '2020-03-02' });

@Injectable()
export class ShoppingCartService {
  constructor(@InjectModel('ShoppingCart') private readonly shoppingCartModel: Model<ShoppingCart>) {}

  async createEmptyCart(): Promise<ShoppingCart> {
    const createdCart = new this.shoppingCartModel({ total: 0 });
    return createdCart.save();
  }

  async createUserCart(userId: string): Promise<ShoppingCart> {
    const createdCart = new this.shoppingCartModel({ "userId": userId, total: 0 });
    return createdCart.save();
  }

  /**
   * Adds user information to anonymous carts
   * @param {!string} cartId The ID of the cart to be modified 
   * @param {!string} userId The ID of the user to be assigned to the cart
   * @return {Promise<ShoppingCart>} Returns a copy of the udpated shopping cart
   * */
  async assignUserToCart(cartId: string, userId: string): Promise<ShoppingCart> {
    let cart = await this.shoppingCartModel.findOne({ _id: cartId }).exec();
    cart.userId = userId;
    return this.shoppingCartModel.findOneAndUpdate({ _id: cartId }, cart, {new: true, useFindAndModify: false}).select("-paymentIntentId");
  }

  /**
   * Destroy a given cart
   * @param {!cartId} cartId The ID of the cart to be destroyed
   * @return {Promise<ShoppingCart|undefined> } returns a copy of the deleted shopping cart 
   *  */
  
  async destroyCart(cartId: string): Promise<ShoppingCart | undefined> {
    return this.shoppingCartModel.findOneAndDelete({ _id: cartId }).select("-paymentIntentId");
  }

  async getCart(cartId: string): Promise<ShoppingCart> {
    return this.shoppingCartModel.findOne({ _id: cartId }).select("-paymentIntentId");
  }

  async getCartByPaymentIntent(paymentIntentId: string): Promise<ShoppingCart> {
    return this.shoppingCartModel.findOne({ "paymentIntentId": paymentIntentId });
  }

  async getPaymentIntentByCart(cartId: string): Promise<string> {
    const cart = await this.shoppingCartModel.findOne({_id: cartId});
    return cart.paymentIntentId;
  }

  async addItemToCart(cartId: string, product: Product, qty: number): Promise<ShoppingCart> {
    let cart = await this.shoppingCartModel.findOne({_id: cartId}).exec();
    let existingItem = cart.items.find(el => el.product._id === product._id);
    if(existingItem) {
      return this.modifyItemInCart(cartId, product, qty);
    }
    else {
      cart.items.push({
        "product": product,
        "qty": qty
      });
      cart.total += product.price * qty;
      return this.shoppingCartModel.findOneAndUpdate({_id: cartId}, cart, {new: true, useFindAndModify: false}).select("-paymentIntentId").exec();
    }
  }

  async addTsItemToCart(cartId: string, tsItem: TrainingSession): Promise<ShoppingCart> {
    let cart = await this.shoppingCartModel.findOne({_id: cartId}).exec();
    let existingItem = cart.tsItems.find(el => el.pk === tsItem.pk);
    if (existingItem) {
      return this.modifyTsItemInCart(cartId, tsItem);
    } else {
      cart.tsItems.push(tsItem);
      cart.total += tsItem.total_cost;
    }

    return this.shoppingCartModel.findOneAndUpdate({_id: cartId}, cart, {new: true, })
  }

  async modifyItemInCart(cartId: string, product: Product, qty:number): Promise<ShoppingCart> {
    if (qty <= 0) {
      return this.removeItemFromCart(cartId, product);
    }
    let cart = await this.shoppingCartModel.findOne({_id: cartId}).exec();
    let item = cart.items.find(el => el.product._id == product._id);
    let oldQty = item.qty
    cart.total = cart.total - oldQty*item.product.price + qty*item.product.price;
    item.qty = qty;
    this.updatePaymentIntent(cartId, {"amount": parseInt((cart.total*100).toFixed(0))})
    return this.shoppingCartModel.findOneAndUpdate({_id: cartId}, cart, {new: true, useFindAndModify: false}).select("-paymentIntentId").exec();
  }

  async modifyTsItemInCart(cartId: string, ts: TrainingSession): Promise<ShoppingCart> {
    if (ts.qty <= 0) {
      return this.removeTsItemFromCart(cartId, ts);
    }
    let cart = await this.shoppingCartModel.findOne({_id: cartId}).exec();
    let item = cart.tsItems.find(el => el.pk === ts.pk);
    let oldQty = item.qty;
    cart.total = cart.total - oldQty*item.unit_price + ts.qty*item.unit_price;
    this.updatePaymentIntent(cartId, {"amount": parseInt((cart.total*100).toFixed(0))});
    return this.shoppingCartModel.findOneAndUpdate({ _id: cartId }, cart, {new: true, useFindAndModify: false}).select("-paymentIntentId").exec();
  }

  async createPaymentIntent(amount: number, currency = "aud", metadata = {}): Promise<Stripe.PaymentIntent> {
    return stripe.paymentIntents.create({
      "amount": parseInt((amount*100).toFixed(0)),
      "currency": currency,
      "metadata": metadata
    })
  }

  async updatePaymentIntent(cartId: string, params?: Stripe.PaymentIntentUpdateParams): Promise<Stripe.PaymentIntent> {
    const id = await this.getPaymentIntentByCart(cartId);
    return stripe.paymentIntents.update(id, params);
  }

  async assignPaymentIntentToCart(cartId: string, paymentIntentId: string): Promise<ShoppingCart>{
    let cart = await this.shoppingCartModel.findOne({ _id: cartId });
    cart.paymentIntentId = paymentIntentId;
    return this.shoppingCartModel.findOneAndUpdate({ _id: cartId }, cart, {new: true, useFindAndModify: false}); 
  }

  async removeItemFromCart(cartId: string, product: Product): Promise<ShoppingCart> {
    let cart = await this.shoppingCartModel.findOne({ _id: cartId }).exec();
    let item = cart.items.find(el => el.product._id === product._id);
    let deleteItemIndex = cart.items.indexOf(item);
    cart.items.splice(deleteItemIndex, 1);
    return this.shoppingCartModel.findOneAndUpdate({_id: cart._id}, cart, {new: true, useFindAndModify: false}).select("-paymentIntentId");
  }

  async removeTsItemFromCart(cartId: string, tsItem: TrainingSession): Promise<ShoppingCart> {
    let cart = await this.shoppingCartModel.findOne({ _id: cartId}).exec();
    let item = cart.tsItems.find(el => el.pk === tsItem.pk );
    let deleteItemIndex = cart.tsItems.indexOf(item);
    cart.items.splice(deleteItemIndex, 1);
    return this.shoppingCartModel.findOneAndUpdate({ _id: cartId }, cart, {new: true, useFindAndModify: false}).select("-paymentIntentId");
  }

}
