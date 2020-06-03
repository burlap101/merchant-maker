<template>
  <div class="my-product-list overflow-auto">
    <div ref="productcard" class="d-flex flex-row mt-2 border" v-for="(product, index) in products" v-bind:key="index">
      <div class="p-3 mr-2 border-right">
        <img v-if="product.images[0] !== undefined" class="my-image" v-bind:src="product.images[0].path"  />
        <img v-else src="../assets/img/img-not-found.svg.png" alt="" class="my-image">
      </div>
      <div class="container d-flex justify-content-between">
        <div class="ml-2 py-3">
          <div class="h6">
            {{ product.name }}
          </div>
          <div>
            {{ product.description }}
          </div>
        </div>
        <div class="py-3 text-right">
          <div class="text-muted">
            ${{ product.price.toFixed(2) }} <br /> <small>{{product.uom}}</small>
          </div>
          <div>
            <button class="mt-1 btn btn-primary">
              Buy Now
            </button>
          </div>
          <div>
            <button class="mt-1 btn btn-sm btn-info">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'product-list',

  computed: {
    ...mapState({
      products: state => state.products
    })
  }
}
</script>

<style scoped>
.my-image {
  display: block;
  min-height: 5rem;
  min-width: 5rem;
  max-height: 5rem;
  width: auto;
  height: auto;
}
.my-product-list {
  max-height: 40rem;
}
</style>