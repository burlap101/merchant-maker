<template>
  <div>
    <h4 class="d-flex justify-content-between align-items-center mb-3">
      <span class="text-muted">Your cart</span>
      <span class="badge badge-secondary badge-pill"
        >{{ products.length + trainingSessions.length }}
        <router-link to="/edit"><i class="fas fa-edit"></i></router-link
      ></span>
    </h4>
    <ul class="list-group mb-3">
      <li
        v-for="(item, index) in trainingSessions"
        v-bind:key="index"
        class="list-group-item"
      >
        <training-session-preview-item v-bind:item="item" />
      </li>
      <li
        v-for="(item, index) in products"
        v-bind:key="index"
        class="list-group-item d-flex justify-content-between lh-condensed"
      >
        <div>
          <h6 class="my-0">
            {{ item.product.name }} -- {{ item.qty }} &times;
            {{ item.product.uom }}
          </h6>
          <small
            v-if="item.product.attributes !== undefined"
            class="text-muted"
          >
            <span
              v-for="(attrName, attrIndex) in Object.keys(
                item.product.attributes
              )"
              v-bind:key="attrIndex"
            >
              {{ attrName }}: {{ item.product.attributes[attrName] }},
            </span>
          </small>
        </div>
        <span class="text-muted"
          >${{ (item.product.price * item.qty).toFixed(2) }}</span
        >
      </li>

      <li class="list-group-item d-flex justify-content-between">
        <span>Total (AUD)</span>
        <strong>${{ grandTotal.toFixed(2) }}</strong>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import TrainingSessionPreviewItem from "./TrainingSessionPreviewItem";

export default {
  name: "shopping-cart-preview",

  components: {
    TrainingSessionPreviewItem
  },

  computed: {
    ...mapState({
      products: state => state.cart.products,
      trainingSessions: state => state.cart.trainingSessions
    }),
    ...mapGetters("cart/", ["grandTotal", "cartLength"])
  }
};
</script>
