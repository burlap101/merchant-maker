import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './interfaces/category.interface';
import { ProposedCategoryDto } from './dto/proposed-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) {}

  async create(proposedCategory: ProposedCategoryDto): Promise<Category> {
    let parent: Category;
    console.log(proposedCategory)
    if (proposedCategory.parent.name) {
      console.log(proposedCategory.parent);
      parent = await this.create(proposedCategory.parent);
    }
    const categories:Category[] = await this.find();
    let catNames = [];
    for (let category of categories) {
      catNames.push(category.name)
    }
    let existingCategoryIndex = catNames.indexOf(proposedCategory.name);
    if (existingCategoryIndex < 0) {
      const createdCategory = new this.categoryModel({
        name: proposedCategory.name,
        description: proposedCategory.description,
        parent: parent !== undefined ? parent._id : ""
      });
      return createdCategory.save();
    } else {
      return categories[existingCategoryIndex];
    }
  }

  async find(key?: string, value?: string): Promise<Category[]> {
    if(!key && !value) {
      return this.categoryModel.find({}).exec();
    } else {
      let query = {};
      query[key] = value;
      return this.categoryModel.find(query).exec();
    }
    
  }
}
