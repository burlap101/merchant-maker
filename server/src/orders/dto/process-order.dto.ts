import { ShoppingCart } from "src/shopping-cart/interfaces/shopping-cart.interface";
import { Customer } from "src/customers/interfaces/customer.interface";

export class ProcessOrderDto {
  readonly chargeId: string;
  readonly receiptNo: string;
  readonly processed: Date;
  readonly receiptUrl: string;
  readonly cart: ShoppingCart;
  readonly customer: Customer;
}