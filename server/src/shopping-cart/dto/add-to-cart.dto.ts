import { Product } from "src/products/interfaces/product.interface";

export class AddToCartDto {
  readonly product: Product;
  readonly qty: number;
}