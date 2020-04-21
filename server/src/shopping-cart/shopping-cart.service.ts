import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ShoppingCart } from './interfaces/shopping-cart.interface';
import { Model } from 'mongoose';
import { Product } from '../products/interfaces/product.interface';
import { identity } from 'rxjs';


@Injectable()
export class ShoppingCartService {
  constructor(@InjectModel('ShoppingCart') private readonly shoppingCartModel: Model<ShoppingCart>) {}

  async createEmptyCart(): Promise<ShoppingCart> {
    const createdCart = new this.shoppingCartModel();
    return createdCart.save();
  }

  async createUserCart(userId: string): Promise<ShoppingCart> {
    const createdCart = new this.shoppingCartModel({ "userId": userId });
    return createdCart.save();
  }

  async updateCartItem(cartId: string, product: Product, newQty: number): Promise<ShoppingCart> {
    let cart = this.shoppingCartModel.find({"_id": cartId });
    let item = cart.items.pull({ "_id": product._id });
    if( newQty > 0) {
      item["qty"] = newQty;
      cart.items.push(item);
    }
    return this.shoppingCartModel.replaceOne({ "_id": cartId }, cart).exec();
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
    console.log(cart, cartId);
    return this.shoppingCartModel.replaceOne({ _id: cartId }, cart);
  }

  /**
   * Destroy a given cart
   * @param {!cartId} cartId The ID of the cart to be destroyed
   * @return {Promise<ShoppingCart|undefined> } returns a copy of the deleted shopping cart 
   *  */
  async destroyCart(cartId: string): Promise<ShoppingCart | undefined> {
    return this.shoppingCartModel.findOneAndDelete({ _id: cartId });
  }

  async getCart(cartId: string): Promise<ShoppingCart> {
    return this.shoppingCartModel.findOne({ _id: cartId });
  }

  async addItemToCart(cartId: string, product: Product, qty: number) {
    let cart = await this.shoppingCartModel.findOne({_id: cartId}).exec();
    cart.items.push({
      "product": product,
      "qty": qty
    });
    return this.shoppingCartModel.replaceOne({_id: cartId}, cart);
  }

  async modifyItemInCart(cartId: string, product: Product, qty:number) {
    let cart = await this.shoppingCartModel.findOne({_id: cartId}).exec();
    for (let item of cart.items) {
      if (item.product._id == product._id) {
        item.qty = qty;
        break;
      }
    }
    return this.shoppingCartModel.replaceOne({_id: cartId}, cart);
  }

}
