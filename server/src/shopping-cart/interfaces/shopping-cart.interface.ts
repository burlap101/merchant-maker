import { Product } from '../../products/interfaces/product.interface';

export interface ShoppingCart {
  _id: string,
  userid?: string,
  items: [{
    product: Product,
    qty: number
  }],
  total: number
}
