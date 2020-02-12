import { Controller, Get, Post, Body, Delete, Param, UseInterceptors } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Product } from './interfaces/product.interface';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Promise<Product[]> {
   return this.productsService.findall();
  }

  @Post('add')
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  } 

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return `this action removes a #${id} product`;
  }
}
