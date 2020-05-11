import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  shippingAddress: Object,
  billingAddress: Object
})