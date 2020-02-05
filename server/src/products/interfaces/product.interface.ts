export interface Product {
  _id: string,
  name: string,
  description: string,
  price: number,
  stockCode: string,
  attributes: Object,
  available: number,
  delete: boolean
}
