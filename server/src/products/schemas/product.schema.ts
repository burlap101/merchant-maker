import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stockCode: String,
  uom: String,
  attributes: Object,
  available: Number,
  images: [Object],
  category: Object,
  categories: [Object],
  deleted: Boolean
})