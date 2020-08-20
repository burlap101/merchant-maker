import * as mongoose from 'mongoose'; 
import { ShippingTypeSchema } from './shipping-type.schema';

export const ShippingMethodSchema = new mongoose.Schema({
  type: ShippingTypeSchema,
  discounts: [Object],
  cost: Number
})