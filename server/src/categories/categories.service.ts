import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './interfaces/category.interface';
import { ProposedCategoryDto } from './dto/proposed-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) {}

  async create(proposedCategory: ProposedCategoryDto, lvl = 0): Promise<Category> {
    let parent: Category;
    let hasParent = false;
    if (proposedCategory.parent.name) {
      let nextLvl = lvl + 1;
      parent = await this.create(proposedCategory.parent, nextLvl);
      hasParent = true;
    }
    const existingCategories = await this.find("name", proposedCategory.name);
    // let catNames = [];
    // for (let category of categories[lvl]) {
    //   catNames.push(category.name)
    // }
    // let existingCategoryIndex = catNames.indexOf(proposedCategory.name);
    if (!existingCategories[lvl]) {
      const createdCategory = new this.categoryModel({
        name: proposedCategory.name,
        description: proposedCategory.description,
        parent: parent ? parent._id : "",
        level: hasParent ? parent.treeSize - lvl : 0,
        treeSize: hasParent ? parent.treeSize : lvl
      });
      return createdCategory.save();
    } else {
      return existingCategories[lvl][0];
    }
  }

  async find(key?: string, value?: string): Promise<Array<Category[]>> {
    if(!key && !value) {
      let result = [];
      if (!this.categoryModel.find().exec()) {
        return [[]];
      }
      let allEntries = await this.categoryModel.find({}).sort({level: 'desc'}).exec();
      for (let lvl = 0; lvl <= allEntries[0].level; lvl++) {
        result.push(await this.categoryModel.find({level: lvl}).exec());
      }
      return result;
    } else {
      let result = [];
      let levels = this.categoryModel.find({}).sort({ level: 'desc' }).exec();
      if (!levels) {
        return this.categoryModel.find({key: value}).exec();
      }
      for (let lvl = 0; lvl <= levels[0]; lvl++) {
        result.push(this.categoryModel.find({ level: lvl, key: value }).exec());
      }
      return result;
    }
    
  }
  
}
