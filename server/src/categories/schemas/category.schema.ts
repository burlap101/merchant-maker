import * as mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: String,
  description: String,
  hasParent: Boolean,
});

CategorySchema.add({children: [CategorySchema]});

export { CategorySchema };