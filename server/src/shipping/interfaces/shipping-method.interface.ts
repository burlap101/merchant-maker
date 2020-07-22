import { DiscountPoint } from "./discount-point.interface";

export interface ShippingMethod {
  type: string,
  discounts?: [DiscountPoint],
  cost: number
}
