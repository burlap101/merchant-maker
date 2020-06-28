<template>
  <div class="row">
    <div class="col">
      <h6 class="my-0">{{ course.course_code }} - {{ course.short_title }}</h6>
      <div class="mt-1">
        <small class="text-muted"
          >at {{ trainingSession.location }},
          {{ trainingSession.session_date }}</small
        >
      </div>
      <div class="text-muted">
        There are <strong>{{ trainingSession.spots_left }}</strong> spots left.
      </div>
    </div>
    <div class="col">
      <div class="d-flex align-items-top justify-content-between">
        <div class="d-flex flex-column align-items-start">
          <div class="">Students</div>
          <div class="input-group">
            <input
              type="text"
              class="form-control col-3"
              v-bind:value="item.qty"
              v-on:change="updateTrainingSessionQty($event.target.value)"
              min="1"
              v-bind:max="trainingSession.spots_left"
            />
            <div class="input-group-append">
              <button
                v-on:click="decrementTrainingSessionQty()"
                class="btn btn-outline-secondary"
                type="button"
              >
                -
              </button>
              <button
                v-on:click="incrementTrainingSessionQty()"
                class="btn btn-outline-secondary"
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div class="">
          <div class="text-muted text-right">
            <div class="col">
              ${{ (item.qty * item.unit_price).toFixed(2) }}
              <a class="text-secondary ml-2" v-on:click="$emit('remove')"
                ><i class="far fa-trash-alt fa-lg"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CourseService } from "../../../shopfront/src/assets/js/CourseService";
import { TrainingSessionService } from "../assets/js/TrainingSessionService";

export default {
  name: "training-session-cart-item",
  props: ["item"],
  data() {
    return {
      trainingSession: {},
      course: {}
    };
  },

  methods: {
    updateTrainingSessionQty: function(newQty) {
      this.$store.commit("cart/updateQty", {
        type: "trainingSession",
        id: this.item.pk,
        qty: newQty
      });
      this.$emit("haschanged");
    },
    incrementTrainingSessionQty: function() {
      this.errors = [];
      if (this.item.qty >= this.trainingSession.spots_left) {
        this.errors.push(
          `Only ${this.trainingSession.spots_left} spots are available`
        );
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        return;
      }
      this.$store.commit("cart/increment", {
        type: "trainingSession",
        id: this.item.pk
      });
      this.$emit("haschanged");
    },
    decrementTrainingSessionQty: function() {
      if (this.item.qty <= 1) {
        return;
      }
      this.$store.commit("cart/decrement", {
        type: "trainingSession",
        id: this.item.pk
      });
      this.$emit("haschanged");
    }
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
