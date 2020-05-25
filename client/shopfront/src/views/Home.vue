<template>
  <div class="">
    <Navbar />
    <ErrorBar />
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import ErrorBar from "@/components/ErrorBar.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    ErrorBar
  }
};
</script>