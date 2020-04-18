import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ShoppingCart } from './interfaces/shopping-cart.interface';
import { Model } from 'mongoose';
import { Product } from '../products/interfaces/product.interface';


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

  async addCartItem(cartId: string, product: Product, qty: number): Promise<ShoppingCart> {
    let cart = this.shoppingCartModel.find({ "_id": cartId });
    cart.items.push({ "product": product, "qty": qty });
    return this.shoppingCartModel.replaceOne({ "_id": cartId }, cart).exec();
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
    let cart = this.shoppingCartModel.find({ "_id": cartId });
    cart.userId = userId;
    return this.shoppingCartModel.replaceOne({ "_id": cartId }, cart).exec();
  }

  async destroyCart(cartId: string): Promise<ShoppingCart> {
    return this.shoppingCartModel.findOneAndDelete({ "_id": cartId });
  }

  async getCart(cartId: string): Promise<ShoppingCart> {
    return this.shoppingCartModel.findOne({ "_id": cartId });
  }
}
