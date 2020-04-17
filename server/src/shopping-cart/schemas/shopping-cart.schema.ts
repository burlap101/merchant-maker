import * as mongoose from 'mongoose';

export const ShoppingCartSchema = new mongoose.Schema({
  userid: String,
  items: [Object]
})