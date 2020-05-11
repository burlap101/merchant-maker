import { Customer } from "src/customers/interfaces/customer.interface";

export class CheckoutDto {
  readonly chargeId: string;
  readonly receiptNo: string;
  readonly email: string;
  readonly processed: Date;
  readonly receiptUrl: string;
  readonly customer: Customer;
  readonly username?: string;
}