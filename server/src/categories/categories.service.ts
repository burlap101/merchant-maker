import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './interfaces/category.interface';
import { ProductCategory } from 'src/products/interfaces/product-category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async create(proposedCategory: ProductCategory, child?: Category, lvl = 0): Promise<Category> {
    console.log(proposedCategory);
    const existingCategories = await this.find("name", proposedCategory.name );

    if (existingCategories.length == 0 && !child) {
      const createdCategory = new this.categoryModel({
        name: proposedCategory.name,
        description: proposedCategory.description,
        hasParent: proposedCategory.parent.name ? true : false,
        children: []
      });
      let parent: Category;
      let newChild = await createdCategory.save();
      if (proposedCategory.parent.name) {
        parent = await this.create(proposedCategory.parent, newChild);
      }
      return newChild;
    } else if (existingCategories.length > 0 && !child) {
      return existingCategories[0]
    } else if (existingCategories.length > 0 && child) {
      existingCategories[0].children.push(child);
      return this.update(existingCategories[0]._id, existingCategories[0]);
    } else if (existingCategories.length == 0 && child) {
      const createdCategory = new this.categoryModel({
        name: proposedCategory.name,
        description: proposedCategory.description,
        hasParent: proposedCategory.parent.name ? true : false,
        children: [child]
      });
      let parent: Category;
      let newChild = await createdCategory.save();
      if (proposedCategory.parent.name) {
        parent = await this.create(proposedCategory.parent, newChild);
      }
      return newChild;
    }
  }

  async update(id: string, newCategory: Category): Promise<Category>{
    return this.categoryModel.findOneAndUpdate({_id: id}, newCategory, {new: true, useFindAndModify: false}).exec();
  }

  async find(key?: string, value?: any): Promise<Category[]> {
    if(!key && !value) {
      if (!this.categoryModel.find().exec()) {
        return [];
      }
      let allEntries = await this.categoryModel.find({}).sort({'name' : 'asc'}).exec();
      return allEntries;
    } else {
      if (value === "false") {
        value = false;
      } else if (value === "true") {
        value = true;
      }
      let filteredEntries: Category[];
      if (key==="hasParent") {
        filteredEntries = await this.categoryModel.find({ "hasParent": value }).sort({ 'name': 'asc' }).exec();
      } else {
        let q = {}
        q[key] = value;
        filteredEntries = await this.categoryModel.find(q).sort({ 'name': 'asc' }).exec();
      }
      return filteredEntries;
    }
  }

  
}
