import { ShoppingCart } from "src/shopping-cart/interfaces/shopping-cart.interface";
import { Address } from "./address.interface";


export interface Order {
  _id: string,
  chargeId: string,
  receiptNo: string,
  email: string,
  processed: Date,
  receiptUrl: string,
  cart: ShoppingCart,
  name: string,
  phone?: string,
  username?: string,
  shippingAddress: Address,
  billingAddress?: Address
}
