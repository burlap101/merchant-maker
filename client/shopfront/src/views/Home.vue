<template>
  <div class="">
    <Navbar />
    <ErrorBar />
    <router-view></router-view>
    <MyFooter />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import ErrorBar from "@/components/ErrorBar.vue";
import MyFooter from "@/components/MyFooter.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    ErrorBar,
    MyFooter
  }
};
</script>