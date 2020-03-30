import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './interfaces/category.interface';
import { ProposedCategoryDto } from './dto/proposed-category.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async create(@Body() proposedCategoryDto: ProposedCategoryDto): Promise<Category> {
    return this.categoriesService.create(proposedCategoryDto);
  }
}
