import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
  coreDetails: {
    name: String,
    email: String,
    phone: String
  },
  shippingAddress: {
    street: String,
    suburb: String,
    postcode: String,
    state: String
  },
  billingAddress: {
    street: String,
    suburb: String,
    postcode: String,
    state: String
  },
  contactable: Boolean
})