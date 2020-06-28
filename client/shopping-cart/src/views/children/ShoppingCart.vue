<template>
  <div class="container">
    <div class="row mt-dual-navbar">
      <h2 class="pt-5 pb-3">Shopping Cart</h2>
    </div>

    <div class="row">
      <div class="col-md-12 mb-2">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Your cart</span>
          <span class="badge badge-secondary badge-pill">{{ cartLength }}</span>
        </h4>
      </div>
    </div>
    <div v-if="errors.length > 0" class="alert alert-danger" role="alert">
      <p v-for="(error, index) in errors" v-bind:key="index">
        {{ index + 1 }}. {{ error }}
      </p>
    </div>
    <form name="shopping_cart_form" id="shopping-cart-form">
      <ul class="list-group mb-3">
        <li
          v-for="(item, index) in trainingSessions"
          v-bind:key="index"
          class="list-group-item"
        >
          <training-session-cart-item
            v-if="item.qty > 0"
            v-on:haschanged="hasChanged = true"
            v-bind:item="item"
          />
        </li>
        <li
          v-for="(item, index) in products"
          v-bind:key="index"
          class="list-group-item"
        >
          <product-cart-item
            v-if="item.qty > 0"
            v-on:value-change="updateProductQty($event, item.product._id)"
            v-on:increment="incrementProductQty(item.product._id)"
            v-on:decrement="decrementProductQty(item.product._id)"
            v-on:remove="updateProductQty(0, item.product._id)"
            v-bind:item="item"
          />
        </li>
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <div class="h5">Total</div>
          <div class="h5">${{ grandTotal.toFixed(2) }}</div>
        </li>
      </ul>
      <div class="row">
        <div class="col-lg-8">
          Save and
          <button
            id="checkout-button"
            v-on:click="saveAndCheckout()"
            class="btn btn-primary mr-2"
          >
            Checkout
          </button>
          or
          <button
            v-on:click="saveAndContinueShopping()"
            class="btn btn-primary ml-2"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import ProductCartItem from "../../components/ProductCartItem.vue";
import TrainingSessionCartItem from "../../components/TrainingSessionCartItem.vue";

export default {
  name: "shopping-cart",

  components: {
    ProductCartItem,
    TrainingSessionCartItem
  },

  data() {
    return {
      errors: [],
      hasChanged: false
    };
  },

  computed: {
    ...mapState({
      products: state => state.cart.products,
      trainingSessions: state => state.cart.trainingSessions
    }),
    ...mapGetters("cart/", ["grandTotal", "cartLength"])
  },

  methods: {
    updateProductQty: function(newQty, productId) {
      this.$store.commit("cart/updateQty", {
        type: "product",
        id: productId,
        qty: newQty
      });
      this.hasChanged = true;
    },
    incrementProductQty: function(productId) {
      this.errors = [];
      let item = this.products.find(el => productId === el.product._id);
      if (item.qty >= item.product.available) {
        this.errors.push(
          `Only ${item.product.available} ${item.product.name}'s are available`
        );
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        return;
      }
      this.$store.commit("cart/increment", {
        type: "product",
        id: productId
      });
      this.hasChanged = true;
    },
    decrementProductQty: function(productId) {
      let item = this.products.find(el => productId === el.product._id);
      if (item.qty <= 1) {
        return;
      }
      this.$store.commit("cart/decrement", {
        type: "product",
        id: productId
      });
      this.hasChanged = true;
    },
    saveAndCheckout: async function() {
      if (this.hasChanged) {
        await this.$store.dispatch("cart/saveCart");
        this.hasChanged = false;
      }
      this.$router.push("/checkout");
    },
    saveAndContinueShopping: function() {
      this.errors = [];
      if (this.hasChanged) {
        this.$store.dispatch("cart/saveCart");
        this.hasChanged = false;
      }
      try {
        this.$router.go(-2);
      } catch (err) {
        this.errors.push(err.message);
      }
    }
  },

  mounted() {
    window.addEventListener("beforeunload", event => {
      if (this.hasChanged) {
        event.preventDefault();
        event.returnValue = "";
        return window.alert("Discard changes?");
      }
      return true;
    });
  }
};
</script>
