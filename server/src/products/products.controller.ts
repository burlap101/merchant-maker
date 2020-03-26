import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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

  @Get(':id')
  findOne(@Param() params): Promise<Product[]> {
    return this.productsService.findOneById(params.id);
  }

  @Post('add') 
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    this.categoriesService.create(createProductDto.category);
    return this.productsService.create(createProductDto);
  }

  @Post('update/:id')
  async update(@Param() params, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    this.categoriesService.create(updateProductDto.category);
    return this.productsService.update(params.id, updateProductDto)
  }

  @Delete('delete/:id') 
  async deleteOneById(@Param() params): Promise<Product> {
    return this.productsService.findOneByIdAndDelete(params.id);
  }
}
