<template>
  <div>
    <!-- For higher res tablets and PCs -->
    <div class="my-product-list overflow-auto d-none d-lg-block">
      <div
        ref="productcard"
        class=""
        v-for="(product, index) in products"
        v-bind:key="index"
      >
        <pc-product-card v-bind:product="product" />
      </div>
    </div>

    <!-- For smaller screens -->
    <div class="">
      <div
        ref="productcard"
        class="d-lg-none"
        v-for="(product, index) in products"
        v-bind:key="index"
      >
        <mobile-product-card v-bind:product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import PcProductCard from "./pc/ProductCard.vue";
import MobileProductCard from "./mobile/ProductCard.vue";
import { mapState } from "vuex";
export default {
  name: "product-list",

  components: {
    PcProductCard,
    MobileProductCard
  },

  computed: {
    ...mapState({
      products: state => state.products,
      cart: state => state.cart
    })
  }
};
</script>

<style scoped lang="scss">
.my-product-list {
  max-height: 640px;
}
</style>
