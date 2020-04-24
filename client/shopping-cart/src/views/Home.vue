<template>
  <div class="">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Home",
  components: {
    Navbar
  }
};
</script>
