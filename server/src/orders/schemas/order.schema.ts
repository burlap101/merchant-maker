import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  chargeId: String,
  receiptNo: String,
  email: String,
  processed: Date,
  receiptUrl: String,
  cart: Object,
  name: String,
  phone: String,
  username: String,
  shippingAddress: Object,
  billingAddress: Object
})