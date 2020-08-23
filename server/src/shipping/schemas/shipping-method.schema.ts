import * as mongoose from 'mongoose'; 

export const ShippingMethodSchema = new mongoose.Schema({
  name: String,
  description: String,
  perProduct: Boolean,
  discounts: [Object],
  cost: Number
})