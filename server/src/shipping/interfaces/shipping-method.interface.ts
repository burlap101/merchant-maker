import { DiscountPoint } from "./discount-point.interface";

export interface ShippingMethod {
  _id: string,
  name: string,
  description: string,
  perProduct: boolean,
  discounts?: [DiscountPoint],
  cost: number
}
