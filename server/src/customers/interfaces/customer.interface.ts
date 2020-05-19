import { CoreDetails } from "./core-details.interface"
import { Address } from "./address.interface";

export interface Customer {
  _id: string,
  coreDetails: CoreDetails,
  shippingAddress: Address,
  billingAddress: Address,
  contactable: boolean
}
