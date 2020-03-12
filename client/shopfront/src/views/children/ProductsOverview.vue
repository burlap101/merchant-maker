<template>
  <div class="mt-dual-navbar">
    <div class="container">
      <div class="row">
        <categories-bar />
        <div class="col-6">
          info goes here
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoriesBar from '@/components/CategoriesBar.vue';

export default {
  name: "products-overview",
  components: {
    CategoriesBar
  }
}
</script>