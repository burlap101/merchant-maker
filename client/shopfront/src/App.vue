<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "shopfront",
  created() {
    this.$store.dispatch("populateProducts");
    // this.$store.dispatch('determineMaxLevels');
    this.$store.dispatch("retrieveCategories");
  }
};
</script>
