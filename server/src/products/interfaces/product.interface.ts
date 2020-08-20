import { ProductCategory } from './product-category.interface';
import { ShippingMethod } from '../../shipping/interfaces/shipping-method.interface';

export interface Product {
  _id: string,
  name: string,
  description: string,
  price: number,
  stockCode: string,
  uom: string,
  attributes: Object,
  available: number,
  images: Array<Object>,
  category: ProductCategory,
  categories: Array<ProductCategory>,
  shippingMethod: ShippingMethod,
  deleted: boolean
}
