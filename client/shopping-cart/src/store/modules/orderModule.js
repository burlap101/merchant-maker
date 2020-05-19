export const orderModule = {
  namespaced: true,
  state: () => ({
    chargeId: "",
    receiptNo: "",
    processed: "",
    receiptUrl: "",
    id: ""
  }),
  mutations: {
    updateFields(state, payload) {
      for (const field in payload) {
        state[field] = payload[field];
      }
    }
  }
};
