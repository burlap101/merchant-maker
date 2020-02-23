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
    if (proposedCategory.parent !== undefined) {
      parent = await this.create(proposedCategory.parent);
      console.log(parent);
    }
    const categories:Category[] = await this.findall();
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

  async findall(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }
}
