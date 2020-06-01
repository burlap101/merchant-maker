import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from 'src/categories/interfaces/category.interface';
import { ProductCategory } from './interfaces/product-category.interface';


@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>
  ) {}

  private categoriesArray: ProductCategory[];

  async create(createProductDto: CreateProductDto): Promise<Product> {
    let convertedProduct = {
      ...createProductDto,
      categories: this.arrayCategories(createProductDto.category)
    };
    console.log(convertedProduct);
    const createdProduct = new this.productModel(convertedProduct);
    return createdProduct.save();
  }

  async findByCategoryTree(categories: ProductCategory[]): Promise<Product[]> {
    let names: string[] = [];
    categories.forEach(el => names.push(el.name));
    const products = this.productModel.find({"categories.name": {$all: names}});
    return products.exec();
  }

  async findall(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async update(id: string, newProduct: UpdateProductDto): Promise<Product> {
    return this.productModel.findOneAndReplace({_id: id}, newProduct).exec();
  }

  async findOneById(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async findOneByIdAndDelete(id: string): Promise<Product> {
    return this.productModel.findOneAndDelete({_id: id});
  }

  arrayCategories(category: ProductCategory): ProductCategory[] {
    this.categoriesArray = [];
    if (category.parent && Object.keys(category.parent).length > 0) {
      this.arrayCategories(category.parent);
    }
    let {parent, ...cat} = category;
    this.categoriesArray.push(cat);
    return this.categoriesArray;
  }
}
