import { Customer } from "src/customers/interfaces/customer.interface";

export class OpenOrderControllerDto {
  readonly customer: Customer;
  readonly trainingSessions?: Array<Object>;
}