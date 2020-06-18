<template>
  <div class="alert alert-danger">
    <div v-for="(error, index) in errors" v-bind:key="index">
      {{ index + 1 }}. {{ error.message }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "error-bar",
  computed: {
    ...mapState({
      errors: state => state.errors
    })
  }
};
</script>

<style scoped></style>
