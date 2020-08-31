import { Product } from '../../products/interfaces/product.interface';
import { TrainingSession } from './training-session.interface';

export interface ShoppingCart {
  _id: string,
  userid?: string,
  items: [{
    product: Product,
    qty: number
  }],
  tsItems: [TrainingSession]
  total: number
}
