import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './interfaces/category.interface';
import { ProposedCategoryDto } from './dto/proposed-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  find(@Query("hasParent") hasParent): Promise<Category[]> {
    if (hasParent !== undefined) {
      return this.categoriesService.find("hasParent", hasParent);
    } else {
      return this.categoriesService.find();
    }
  }

  @Get('nested')
  findNested(): Promise<Category[]> {
    return this.categoriesService.nestAllChildren();
  }

  @Post('add')
  async create(@Body() proposedCategoryDto: ProposedCategoryDto): Promise<Category> {
    return this.categoriesService.create(proposedCategoryDto);
  }
}
