<template>
  <div class="">
    <Navbar />
    <router-view></router-view>
    <MyFooter />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import MyFooter from "@/components/MyFooter.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    MyFooter
  }
};
</script>
