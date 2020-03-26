<template>
  <div class="mt-dual-navbar">
    <div class="container">
      <div class="row">
        <categories-bar />
        <div class="col mt-4">
          <product-list />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoriesBar from '@/components/CategoriesBar.vue';
import ProductList from '@/components/ProductList.vue';

export default {
  name: "products-overview",
  components: {
    CategoriesBar,
    ProductList
  }
}
</script>