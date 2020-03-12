import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './interfaces/category.interface';
import { ProposedCategoryDto } from './dto/proposed-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  find(@Query("parent") parent): Promise<Array<Category[]>> {
    if (parent === "noparent") {
      return this.categoriesService.find("parent", "");
    } else if (parent) {
      return this.categoriesService.find("parent", parent);
    } else {
      return this.categoriesService.find();
    }
  }

  @Post('add')
  async create(@Body() proposedCategoryDto: ProposedCategoryDto): Promise<Category> {
    return this.categoriesService.create(proposedCategoryDto);
  }
}
