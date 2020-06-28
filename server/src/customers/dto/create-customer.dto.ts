import { CoreDetails } from '../interfaces/core-details.interface';
import { Address } from '../interfaces/address.interface';

export class CreateCustomerDto {
  readonly coreDetails: CoreDetails;
  readonly shippingAddress?: Address;
  readonly billingAddress?: Address;
  readonly contactable: boolean;
}