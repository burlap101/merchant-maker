export class CreateProductDto {d
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly stockCode: string;
  readonly attributes: Object;
  readonly available: number;
  readonly delete: boolean;
}