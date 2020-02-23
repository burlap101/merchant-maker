import { Category } from "../interfaces/category.interface";


export class ProposedCategoryDto {
  readonly name: string;
  readonly description: string;
  readonly parent: Category;
}