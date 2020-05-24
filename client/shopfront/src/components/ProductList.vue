<template>
  <div>
    <div ref="productcard" class="d-flex flex-row mt-2 border" v-for="(product, index) in products" v-bind:key="index">
      <div class="p-3 mr-2 border-right">
        <img v-if="product.images[0].path !== undefined" class="my-image" v-bind:src="product.images[0].path"  />
      </div>
      <div class="ml-2 py-3">
        {{ product.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'product-list',
  data() {
    return {
      errors: []
    }
  },

  computed: {
    ...mapState({
      products: state => state.products
    })
  },

  async created() {
    let res = await fetch('/products');
    if (res.ok) {
      this.errors = [];
      this.products = await res.json();
    } else {
      this.errors.push(res);
    }
  }
}
</script>

<style scoped>
.my-image {
  max-height: 5rem;
  max-width: fit-content;
}
</style>