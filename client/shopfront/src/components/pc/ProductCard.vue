<template>
  <div class="d-flex flex-row mt-2 border">
    <add-to-cart-modal
      v-if="showAddToCartModal"
      v-on:close="showAddToCartModal = false"
      v-bind:product="product"
    />
    <buy-now-modal
      v-if="showBuyNowModal"
      v-on:close="showBuyNowModal = false"
      v-bind:product="product"
    />
    <div class="p-3 mr-2 border-right">
      <img
        v-if="product.images[0] !== undefined"
        class="my-image"
        v-bind:src="'/store/media/' + product.images[0].filename"
      />
      <img
        v-else
        src="../../assets/img/img-not-found.svg.png"
        class="my-image"
      />
    </div>
    <div class="container d-flex justify-content-between">
      <div class="ml-2 py-3 d-flex flex-column justify-content-between">
        <div>
          <div class="h6">
            {{ product.name }}
          </div>
          <div>
            {{ product.description }}
          </div>
        </div>
        <div class="">
          <span
            v-for="(category, index) in product.categories"
            class="text-dark"
            v-bind:key="index"
          >
            <small
              >{{ category.name }}
              <strong v-if="index + 1 !== product.categories.length">
                >
              </strong></small
            >
          </span>
        </div>
      </div>
      <div class="py-3 text-right">
        <div class="text-muted">
          ${{ product.price.toFixed(2) }} <br />
          <small>{{ product.uom }}</small>
        </div>
        <div>
          <button
            class="mt-1 btn btn-primary"
            v-on:click="showBuyNowModal = true"
          >
            Buy Now
          </button>
        </div>
        <div>
          <button
            class="mt-1 btn btn-sm btn-info"
            v-on:click="showAddToCartModal = true"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddToCartModal from "../AddToCartModal.vue";
import BuyNowModal from "../BuyNowModal.vue";
export default {
  name: "pc-product-card",

  props: ["product"],

  components: {
    AddToCartModal,
    BuyNowModal
  },
  data() {
    return {
      showAddToCartModal: false,
      showBuyNowModal: false
    };
  },

  methods: {
    addToCart: function(qty) {
      this.$store.dispatch("cart/addProductToCart", {
        product: this.product,
        qty: qty
      });
    }
  }
};
</script>

<style scoped lang="scss">
$min-image-height: 80px;
$min-image-width: 80px;

.my-image {
  display: block;
  width: $min-image-width;
  height: auto;
}
.my-product-list {
  max-height: 640px;
}

button {
  min-width: 95px;
}
</style>
