import * as mongoose from 'mongoose';
import { CustomerSchema } from 'src/customers/schemas/customer.schema';
import { ShoppingCartSchema } from 'src/shopping-cart/schemas/shopping-cart.schema';

export const OrderSchema = new mongoose.Schema({
  chargeId: String,
  receiptNo: String,
  email: String,
  processed: Date,
  receiptUrl: String,
  cart: ShoppingCartSchema,
  trainingSessions: [Object],
  username: String,
  customer: CustomerSchema,
  status: String
})