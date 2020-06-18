import { CoreFields } from "../../assets/js/CoreFields";
import { AddressFields } from "../../assets/js/AddressFields";
import { CheckoutValidation } from "../../assets/js/CheckoutValidation";

const allFields = () => {
  let fields = {};
  fields.coreDetails = {};
  for (const type in CoreFields) {
    for (const fieldname in CoreFields[type]) {
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
};

export const customerModule = {
  namespaced: true,
  state: () => ({
    ...Object.assign({}, allFields()),
    contactable: false,
    errors: []
  }),

  mutations: {
    updateFields(state, payload) {
      for (const fieldType in payload) {
        for (const fieldName in payload[fieldType]) {
          state[fieldType][fieldName] = payload[fieldType][fieldName];
        }
      }
    },

    isContactable(state, payload) {
      state.contactable = payload.contactable;
    },

    copyShippingToBillingAddress(state) {
      state.billingAddress = { ...state.shippingAddress };
    },

    validateFields(state) {
      state.errors = [];
      for (const fieldName in state.coreDetails) {
        try {
          if (
            !CheckoutValidation.validateTextField(
              state.coreDetails[fieldName],
              CoreFields.text[fieldName].required,
              CoreFields.text[fieldName].re
            )
          ) {
            state.errors.push(
              CoreFields.text[fieldName].label +
                " field " +
                CoreFields.text[fieldName].errorMsg.toLowerCase()
            );
          }
        } catch (err) {
          state.errors.push(
            CoreFields.text[fieldName].label + " " + err.message.toLowerCase()
          );
        }
      }

      for (const fieldName in state.shippingAddress) {
        try {
          if (
            AddressFields.text[fieldName] &&
            !CheckoutValidation.validateTextField(
              state.shippingAddress[fieldName],
              AddressFields.text[fieldName].required,
              AddressFields.text[fieldName].re
            )
          ) {
            state.errors.push(
              "Shipping Address " +
                AddressFields.text[fieldName].label +
                " field " +
                AddressFields.text[fieldName].errorMsg.toLowerCase()
            );
          } else if (
            AddressFields.select[fieldName] &&
            !CheckoutValidation.validateTextField(
              state.shippingAddress[fieldName],
              AddressFields.select[fieldName].required,
              AddressFields.select[fieldName].re
            )
          ) {
            state.errors.push(
              "Shipping Address " +
                AddressFields.select[fieldName].label +
                " field " +
                AddressFields.select[fieldName].errorMsg.toLowerCase()
            );
          }
        } catch (err) {
          err.message;
          if (AddressFields.text[fieldName]) {
            state.errors.push(
              "Shipping Address " +
                AddressFields.text[fieldName].label +
                " " +
                err.message.toLowerCase()
            );
          } else if (AddressFields.select[fieldName]) {
            state.errors.push(
              "Shipping Address " +
                AddressFields.select[fieldName].label +
                " " +
                err.message.toLowerCase()
            );
          } else {
            throw err;
          }
        }
      }

      for (const fieldName in state.billingAddress) {
        try {
          if (
            AddressFields.text[fieldName] &&
            !CheckoutValidation.validateTextField(
              state.billingAddress[fieldName],
              AddressFields.text[fieldName].required,
              AddressFields.text[fieldName].re
            )
          ) {
            state.errors.push(
              "Billing Address " +
                AddressFields.text[fieldName].label +
                " field " +
                AddressFields.text[fieldName].errorMsg.toLowerCase()
            );
          } else if (
            AddressFields.select[fieldName] &&
            !CheckoutValidation.validateTextField(
              state.billingAddress[fieldName],
              AddressFields.select[fieldName].required,
              AddressFields.select[fieldName].re
            )
          ) {
            state.errors.push(
              "Billing Address " +
                AddressFields.select[fieldName].label +
                " field " +
                AddressFields.select[fieldName].errorMsg.toLowerCase()
            );
          }
        } catch (err) {
          if (AddressFields.text[fieldName]) {
            state.errors.push(
              "Billing Address " +
                AddressFields.text[fieldName].label +
                " " +
                err.message.toLowerCase()
            );
          } else if (AddressFields.select[fieldName]) {
            state.errors.push(
              "Billing Address " +
                AddressFields.select[fieldName].label +
                " " +
                err.message.toLowerCase()
            );
          } else {
            throw err;
          }
        }
      }
    }
  }
};
