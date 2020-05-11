import { CoreDetails } from "./core-details.interface"
import { Address } from "./address.interface";

export interface Customer {
  coreDetails: CoreDetails,
  shippingAddress: Address,
  billingAddress: Address
}
