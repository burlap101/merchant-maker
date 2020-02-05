import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stockCode: String,
  attributes: Object,
  available: Number,
  delete: Boolean
})