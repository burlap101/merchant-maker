import { DiscountPoint } from "./discount-point.interface";
import { ShippingType } from "./shipping-type.interface";

export interface ShippingMethod {
  _id: string,
  description: string,
  type: ShippingType,
  discounts?: [DiscountPoint],
  cost: number
}
