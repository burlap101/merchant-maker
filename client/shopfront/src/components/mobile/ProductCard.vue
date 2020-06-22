<template>
  <div class="d-flex flex-row justify-content-between mt-2 border">
    <div class="d-flex flex-column">
      <div class="p-3">
        <img
          v-if="product.images[0] !== undefined"
          class="my-image"
          v-bind:src="'/store/media/' + product.images[0].filename"
          v-bind:alt="'../../assets/img/img-not-found.svg.png'"
        />
        <img
          v-else
          src="../../assets/img/img-not-found.svg.png"
          alt=""
          class="my-image"
        />
      </div>
      <div class="px-3 pb-3">
        <div class="h6">
          {{ product.name }}
        </div>
        <div>
          {{ product.description }}
        </div>
      </div>
    </div>
    <div class="d-flex flex-column m-2">
      <div class="text-right">
        <div class="text-muted mb-2">
          ${{ product.price.toFixed(2) }} <br />
          <small>{{ product.uom }}</small>
        </div>
      </div>
      <div class="d-flex flex-column align-items-bottom">
        <div>
          <button class="mt-1 btn btn-primary">
            Buy Now
          </button>
        </div>
        <div>
          <button class="mt-1 btn btn-sm btn-info" v-on:click="addToCart()">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mobile-product-card",

  props: ["product"],

  methods: {
    addToCart: function() {
      this.$store.commit("addToCart", { products: [this.product] });
    }
  }
};
</script>

<style scoped lang="scss">
$min-image-height: 80px;
$min-image-width: 80px;

.my-image {
  display: block;
  height: $min-image-height;
  width: auto;
}

button {
  min-width: 95px;
}
</style>
