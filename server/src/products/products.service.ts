import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findall(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async update(id: string, newProduct: UpdateProductDto): Promise<Product> {
    return this.productModel.findOneAndReplace({_id: id}, newProduct).exec();
  }

  async findOneById(id: string) {
    return this.productModel.findById(id).exec();
  }

  async findOneByIdAndDelete(id: string) {
    return this.productModel.findOneAndDelete({_id: id});
  }
}
