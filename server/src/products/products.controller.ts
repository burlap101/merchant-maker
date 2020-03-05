import { Controller, Get, Post, Body, Delete, Param, UseInterceptors } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Product } from './interfaces/product.interface';
import { CategoriesService } from 'src/categories/categories.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService
  ) {}

  @Get()
  findAll(): Promise<Product[]> {
   return this.productsService.findall();
  }

  @Post('add') 
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    const category = this.categoriesService.create(createProductDto.category);
    console.log(category);
    return this.productsService.create(createProductDto);
  } 

  @Delete(':id') 
  delete(@Param() id): String {
    return `this action removes a #${id} product`;
  }
}
