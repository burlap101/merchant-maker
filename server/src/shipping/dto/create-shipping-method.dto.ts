import { DiscountPoint } from "../interfaces/discount-point.interface";
import { ShippingType } from "../interfaces/shipping-type.interface";

export class CreateShippingMethodDto {
  readonly description: string;
  readonly type: ShippingType;
  readonly cost: number;
  readonly discounts?: [DiscountPoint];
}