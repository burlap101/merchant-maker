import { ShoppingCart } from "src/shopping-cart/interfaces/shopping-cart.interface";

export class ProcessOrderDto {
  readonly chargeId: string;
  readonly receiptNo: string;
  readonly email: string;
  readonly processed: Date;
  readonly receiptUrl: string;
  readonly cart: ShoppingCart;
  readonly name: string;
  readonly phone?: string;
  readonly username?: string;
}