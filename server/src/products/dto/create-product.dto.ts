import { ProductCategory } from '../interfaces/product-category.interface';
import { ShippingMethod } from 'src/shipping/interfaces/shipping-method.interface';

export class CreateProductDto {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly uom: string;
  readonly stockCode: string;
  readonly attributes: Object;
  readonly available: number;
  readonly category: ProductCategory;
  readonly shippingMethod: ShippingMethod;
  readonly images: Array<Object>;
}