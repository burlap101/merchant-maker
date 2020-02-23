import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './interfaces/category.interface';
import { ProposedCategoryDto } from './dto/proposed-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findall(): Promise<Category[]> {
    return this.categoriesService.findall();
  }

  @Post('add')
  async create(@Body() proposedCategoryDto: ProposedCategoryDto): Promise<Category> {
    return this.categoriesService.create(proposedCategoryDto);
  }
}
