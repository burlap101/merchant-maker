import { CoreFields } from "../../assets/js/CoreFields";
import { AddressFields } from "../../assets/js/AddressFields";

const allFields = () => {
  let fields = {};
  fields.coreDetails = {};
  for(const type in CoreFields) {
    for(const fieldname in CoreFields[type]) {
      const field = CoreFields[type][fieldname];
      fields.coreDetails[field.id] = field.value;
    }
  }

  fields.shippingAddress = {};
  fields.billingAddress = {};

  for (const type in AddressFields) {
    for (const fieldname in AddressFields[type]) {
      const field = AddressFields[type][fieldname];
      fields.shippingAddress[field.id] = field.value;
      fields.billingAddress[field.id] = field.value;
    }
  }

  return fields;
}

export const customerModule = {
  namespaced: true,
  state: () => ({
    ...Object.assign({}, allFields())
  }),
  mutations: {
    updateFields (state, payload) {
      for (const fieldType in payload) {
        for(const fieldName in payload[fieldType]) {
          state[fieldType][fieldName] = payload[fieldType][fieldName]
        }
      }
    }
  }
}