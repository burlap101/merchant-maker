import * as mongoose from 'mongoose';

export const ShippingTypeSchema = new mongoose.Schema({
  name: String,
  description: String,
  perProduct: Boolean
})