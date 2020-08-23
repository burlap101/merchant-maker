import { ShippingService } from "../../assets/js/ShippingService";
import { ShippingTypeFields } from "../../assets/js/ShippingTypeFields";
import { Validation } from "../../assets/js/Validation";

export const shippingModule = {
  namespaced: true,
  state: () => ({
    errors: [],
    discountPoints: [{ point: undefined, discount: undefined }]
  }),

  getters: {},

  mutations: {
    addError(state, payload) {
      state.errors.push(payload.message);
    },

    clearErrors(state) {
      state.errors = [];
    },

    addDiscountPoint(state, payload) {
      state.discountPoints.push(payload);
    },

    clearDiscountPoints(state) {
      state.discountPoints = [];
    },

    removeDiscountPoint(state, payload) {
      state.discountPoints.splice(payload.index, 1);
    }
  },

  actions: {}
};
