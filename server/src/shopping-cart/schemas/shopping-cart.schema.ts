import * as mongoose from 'mongoose';

export const ShoppingCartSchema = new mongoose.Schema({
  userId: String,
  items: [Object]
})