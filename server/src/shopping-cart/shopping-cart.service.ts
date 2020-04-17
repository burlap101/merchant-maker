import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ShoppingCart } from './interfaces/shopping-cart.interface';
import { Model } from 'mongoose';

@Injectable()
export class ShoppingCartService {
  constructor(@InjectModel('ShoppingCart') private readonly shoppingCartModel: Model<ShoppingCart>) {}

  async createEmptyCart(): Promise<ShoppingCart> {
    const createdCart = new this.shoppingCartModel();
    return createdCart.save();
  }
}
