export class CheckoutDto {
  readonly chargeId: string;
  readonly receiptNo: string;
  readonly email: string;
  readonly processed: Date;
  readonly receiptUrl: string;
  readonly name: string;
  readonly phone?: string;
  readonly username?: string;
}