var baseUrl = "/api/trainingsessions";

export const TrainingSessionService = {
  // Get Training Sessions, all or by course id.
  getTrainingSessions: async function(courseId) {
    let url = baseUrl;
    if (courseId !== undefined) {
      url += "?course_id=" + courseId;
    }
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("TrainingSesssionsService: Network response was not ok");
    }
    return res.json();
  },

  getSingleTrainingSession: async function(tsId) {
    let url = "/api/trainingsession?ts=" + tsId;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("TrainingSessionService: Network response was not ok");
    }
    return res.json();
  }
};
