import { ShippingService } from "../../assets/js/ShippingService";

export const shippingModule = {
  namespaced: true,
  state: () => ({
    types: [],
    errors: [],
    changedTypes: []
  }),

  getters: {},

  mutations: {
    addTypes(state, payload) {
      state.types = state.types.concat(payload.items);
    },

    addType(state, payload) {
      state.types.push(payload.newType);
    },

    removeType(state, payload) {
      state.types.splice(payload.index, 1);
    },

    updateType(state, payload) {
      state.types.splice(payload.index, 1, payload.newType);
    },

    addError(state, payload) {
      state.errors.push(payload.message);
    }
  },

  actions: {
    async populateTypes({ commit, state }) {
      let shippingTypes = await ShippingService.findAllTypes();
      state.types = [];
      commit("addTypes", {
        items: shippingTypes
      });
    },

    /**
     * Handles updates and deletions only. Adding of a new
     * type to the DB happens when the Shipping Method is
     * created automatically via the backend.
     *  */
    async saveTypes({ state, commit }) {
      for (let id of state.changedTypes) {
        let item = state.types.find(el => el.types._id === id);
        let index = state.types.indexOf(item);
        if (item.change === "DELETE") {
          ShippingService.deleteType(item._id);
          commit("removeType", {
            index: index
          });
        } else if (item.change === "UPDATE") {
          let newType = await ShippingService.updateType(item);
          commit("updateType", {
            index: index,
            newType: newType
          });
        }
      }
    }
  }
};
