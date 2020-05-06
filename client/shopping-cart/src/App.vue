<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "shopping-cart-app",
  created() {
    this.$store.dispatch('populateCart');
  }
}
</script>
