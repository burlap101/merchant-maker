import { Category } from '../../categories/interfaces/category.interface';

export class UpdateProductDto {
  readonly _id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly uom: string;
  readonly stockCode: string;
  readonly attributes: Object;
  readonly available: number;
  readonly category: Category;
  readonly images: Array<Object>;
}