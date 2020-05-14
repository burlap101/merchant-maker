import { Customer } from "src/customers/interfaces/customer.interface";

export class CheckoutDto {
  readonly customer: Customer;
  readonly paymentIntentId: string;
  readonly username?: string;
}