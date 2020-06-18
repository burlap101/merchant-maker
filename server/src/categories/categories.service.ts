import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './interfaces/category.interface';
import { ProductCategory } from 'src/products/interfaces/product-category.interface';
import * as _ from 'lodash';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async create(proposedCategory: ProductCategory, child?: Category, lvl = 0): Promise<Category> {
    try {
      const existingCategories = await this.categoryModel.find({ "name": proposedCategory.name, "description": proposedCategory.description }).exec();
      if (existingCategories.length == 0 && !child) {
        const createdCategory = new this.categoryModel({
          name: proposedCategory.name,
          description: proposedCategory.description,
          hasParent: proposedCategory.parent.name ? true : false,
          children: [],
          level: lvl
        });
        let parent: Category;
        let newChild = await createdCategory.save();
        if (proposedCategory.parent.name) {
          parent = await this.create(proposedCategory.parent, newChild, lvl+1);
        }
        return newChild;
      } else if (existingCategories.length > 0 && !child) {
        return existingCategories[0]
      } else if (existingCategories.length > 0 && child) {
        let parent: Category;
        let newChild: Promise<Category>;
        let childIndex = _.findIndex(existingCategories[0].children, { "name": child.name, "description": child.description })
        if (childIndex >= 0) {
          console.log(`Removing index ${childIndex} from ${existingCategories[0].name}.children:`)
          console.log(existingCategories[0].children[childIndex]);
          existingCategories[0].children.splice(childIndex, 1);
          console.log("And after deletion the array looks like this:")
          console.log(existingCategories[0].children);
        }
        existingCategories[0].children.push(child);
        newChild = this.update(existingCategories[0]._id, existingCategories[0]);
        if ((await newChild).hasParent) {
          parent = (await this.findByObject({ 'children': { $elemMatch: {"name": (await newChild).name, "description": (await newChild).description }}}))[0];
          this.create(parent, await newChild, lvl + 1);
        }
        return newChild;
      } else if (existingCategories.length == 0 && child) {
        const createdCategory = new this.categoryModel({
          name: proposedCategory.name,
          description: proposedCategory.description,
          hasParent: proposedCategory.parent.name ? true : false,
          children: [child],
          level: lvl
        });
        let parent: Category;
        let newChild = await createdCategory.save();
        if (proposedCategory.parent.name) {
          parent = await this.create(proposedCategory.parent, newChild, lvl + 1);
        }
        return newChild;
      }
    } catch (err) {
      console.log("child:\n", child);
      console.log("proposedCategory:\n", proposedCategory);
      throw err;
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

  async findByObject(queryObj: Object): Promise<Category[]> {
    return this.categoryModel.find(queryObj).sort({ 'name': 'asc'}).exec();
  }

  
}
