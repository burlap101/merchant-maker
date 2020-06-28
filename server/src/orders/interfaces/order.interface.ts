import { ShoppingCart } from "src/shopping-cart/interfaces/shopping-cart.interface";
import { Customer } from "../../customers/interfaces/customer.interface";


export interface Order {
  _id: string,
  chargeId: string,
  receiptNo: string,
  email: string,
  processed: Date,
  receiptUrl: string,
  cart: ShoppingCart,
  username?: string,
  customer: Customer,
  status: string,
  trainingSessions?: Array<Object>
}
