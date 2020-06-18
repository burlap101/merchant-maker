<template>
  <div class="after-navbar">
    <Navbar />
    <ErrorBar v-if="errors.length > 0" />
    <router-view></router-view>
    <MyFooter />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import ErrorBar from "@/components/ErrorBar.vue";
import MyFooter from "@/components/MyFooter.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    Navbar,
    ErrorBar,
    MyFooter
  },
  computed: {
    ...mapState({
      errors: state => state.errors.concat(state.cart.errors)
    })
  }
};
</script>
