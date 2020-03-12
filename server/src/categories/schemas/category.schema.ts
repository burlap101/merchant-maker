import * as mongoose from 'mongoose';
import { Category } from '../interfaces/category.interface';

export const CategorySchema = new mongoose.Schema({
  name: String,
  description: String,
  level: Number,
  treeSize: Number,
  parent: String
})