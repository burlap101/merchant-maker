import { CourseService } from "../../../../shopfront/src/assets/js/CourseService";
import { TrainingSessionService } from "../../assets/js/TrainingSessionService";
export const orderModule = {
  namespaced: true,
  state: () => ({
    chargeId: "",
    receiptNo: "",
    processed: "",
    receiptUrl: "",
    id: "",
    trainingSessions: []
  }),
  mutations: {
    updateFields(state, payload) {
      for (const field in payload) {
        state[field] = payload[field];
      }
    },
    setTrainingSessions(state, payload) {
      state.trainingSessions = payload.trainingSessions;
    }
  },
  actions: {
    async populateTrainingSessionData({ commit }, payload) {
      let trainingSessions = [];
      for (let ts of payload.trainingSessions) {
        let tsObj = {
          course: await CourseService.getCourses(ts.course),
          training_session: await TrainingSessionService.getSingleTrainingSession(
            ts.training_session
          ),
          total_cost: ts.total_cost,
          pk: ts.pk,
          qty: ts.qty,
          unit_price: ts.unit_price
        };
        trainingSessions.push(tsObj);
      }
      commit("setTrainingSessions", { trainingSessions });
    }
  }
};
