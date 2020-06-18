import * as mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: String,
  description: String,
  hasParent: Boolean,
  level: Number
});

CategorySchema.add({children: [CategorySchema]});

export { CategorySchema };