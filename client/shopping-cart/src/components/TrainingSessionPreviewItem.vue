<template>
  <div class="d-flex justify-content-between lh-condensed">
    <div>
      <h6 class="my-0">{{ course.course_code }} for {{ item.qty }} students</h6>
      <small class="text-muted"
        >{{ course.title }} at {{ trainingSession.location }},
        {{
          new Date(trainingSession.session_date).toLocaleString("en-GB")
        }}</small
      >
    </div>
    <span class="text-muted"
      >${{ (item.qty * item.unit_price).toFixed(2) }}</span
    >
  </div>
</template>

<script>
import { CourseService } from "../../../shopfront/src/assets/js/CourseService";
import { TrainingSessionService } from "../assets/js/TrainingSessionService";
export default {
  name: "training-session-preview-item",
  props: ["item"],
  data() {
    return {
      course: {},
      trainingSession: {}
    };
  },

  async created() {
    const c = await CourseService.getCourses(this.item.course);
    const ts = await TrainingSessionService.getSingleTrainingSession(
      this.item.training_session
    );
    this.course = Object.assign({}, this.course, c);
    this.trainingSession = Object.assign({}, this.trainingSession, ts);
  }
};
</script>
