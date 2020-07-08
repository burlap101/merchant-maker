import { ProductCategory } from './product-category.interface';

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
  shippingCalc?: string,
  deleted: boolean
}
