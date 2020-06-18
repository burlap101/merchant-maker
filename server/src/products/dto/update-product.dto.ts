import { CreateProductDto } from './create-product.dto';
import { ProductCategory } from '../interfaces/product-category.interface';

export class UpdateProductDto extends CreateProductDto {
  readonly _id: string;
  readonly categories: ProductCategory[];
}