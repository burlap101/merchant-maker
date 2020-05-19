import { ShoppingCart } from "src/shopping-cart/interfaces/shopping-cart.interface";
import { Customer } from "src/customers/interfaces/customer.interface";

export class OpenOrderDto {
  readonly cart: ShoppingCart;
  readonly customer: Customer;
}