import { DiscountPoint } from "../interfaces/discount-point.interface";

export class CreateShippingMethodDto {
  readonly name: string;
  readonly description: string;
  readonly perProduct: boolean;
  readonly cost: number;
  readonly discounts?: [DiscountPoint];
}