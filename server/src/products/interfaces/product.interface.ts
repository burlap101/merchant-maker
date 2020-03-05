import { Category } from '../../categories/interfaces/category.interface';

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
  category: Category,
  deleted: boolean
}
