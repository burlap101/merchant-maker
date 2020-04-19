import { Product } from "src/products/interfaces/product.interface";

export class ModifyCartQtyDto {
  readonly product: Product;
  readonly qty: number;
}