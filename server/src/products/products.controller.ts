import { Controller, Get, Post, Body, Delete, Param, UseGuards, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './interfaces/product.interface';
import { CategoriesService } from 'src/categories/categories.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('api/products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService
  ) {}
  
  @Get()
  findAll(): Promise<Product[]> {
   return this.productsService.findall();
  }

  @Post('categories')
  findByCategories(@Body() q): Promise<Product[]> {
    return this.productsService.findByCategoryTree(q.categories);
  }

  @Get(':id')
  findOne(@Param() params): Promise<Product> {
    return this.productsService.findOneById(params.id);
  }

  @Roles('admin', 'superuser')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add') 
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    this.categoriesService.create(createProductDto.category);
    return this.productsService.create(createProductDto);
  }

  @Roles('admin', 'superuser')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('update/:id')
  async update(@Param() params, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    this.categoriesService.create(updateProductDto.category);
    return this.productsService.update(params.id, updateProductDto)
  }

  @Roles('superuser')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('delete/:id') 
  async deleteOneById(@Param() params): Promise<Product> {
    return this.productsService.findOneByIdAndDelete(params.id);
  }
}
