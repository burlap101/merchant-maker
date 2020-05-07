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
    <form name="shopping_cart_form" id="shopping-cart-form">
      <ul class="list-group mb-3">
        <li
          v-for="(item, index) in trainingSessions"
          v-bind:key="index"
          class="list-group-item"
        >
          <div class="row">
            <div class="col-6">
              <h6 class="my-0">
                {{ item.course.course_code }} - {{ item.course.title }}
              </h6>
              <small class="text-muted align-middle">
                at {{ item.training_session.location }},
                {{ item.training_session.session_date }}</small
              >
              <br /><span class="text-muted align-bottom">
                There are
                <strong>{{ item.training_session.spots_left }}</strong> spots
                left.</span
              >
            </div>
            <div class="col-2 text-center">
              <h6>No. of Students</h6>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  v-bind:value="item.qty"
                  aria-label="No. of Students"
                  aria-describedby="basic-addon2"
                  min="1"
                  v-bind:max="item.training_session.spots_left"
                />
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button">
                    -
                  </button>
                  <button class="btn btn-outline-secondary" type="button">
                    +
                  </button>
                </div>
              </div>
            </div>
            <div class="col-3 text-muted text-right align-bottom">
              ${{ item.total_cost.toFixed(2) }}
            </div>
            <div class="col-1">
              <a class="text-secondary"
                ><i class="far fa-trash-alt fa-lg"></i
              ></a>
            </div>
          </div>
        </li>
        <li
          v-for="(item, index) in products"
          v-bind:key="index"
          class="list-group-item"
        >
          <product-cart-item 
            v-on:value-change="updateProductQty($event, item.product._id)" 
            v-on:increment="incrementProductQty(item.product._id)"
            v-on:decrement="decrementProductQty(item.product._id)"
            v-bind:item="item" />
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div class="h5">Total</div>
          <div class="h5">${{ grandTotal.toFixed(2) }}</div>
        </li>
      </ul>
      <div class="row">
        <div class="col-lg-8">
            Save and 
            <button id="checkout-button" v-on:click="saveAndCheckout()" class="btn btn-primary mr-2">
              Checkout
            </button>
             or 
            <button v-on:click="saveAndContinueShopping()" class="btn btn-primary ml-2">
              Continue Shopping
            </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import ProductCartItem from "../../components/ProductCartItem.vue";
export default {
  name: "shopping-cart",

  components: {
    ProductCartItem
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
      trainingSessions: state => state.cart.trainingSessions,
    }),
    ...mapGetters('cart/', [
      'grandTotal',
      'cartLength'
    ])
  },

  methods: {
    updateProductQty: function(newQty, productId) {
      console.log(newQty);
      this.$store.commit('cart/updateQty', {
        type: "product",
        id: productId,
        qty: newQty
      });
      this.hasChanged = true;
    },
    incrementProductQty: function(productId) {
      this.$store.commit('cart/increment', {
        type: "product",
        id: productId
      });
      this.hasChanged = true;
    },
    decrementProductQty: function(productId) {
      this.$store.commit('cart/decrement', {
        type: "product",
        id: productId
      })
      this.hasChanged = true;
    },
    saveAndCheckout: function() {
      if (this.hasChanged) {
        this.$store.dispatch('cart/saveCart');
        this.hasChanged = false;
      }
      this.$router.push("/checkout");
    },
    saveAndContinueShopping: function() {
      if (this.hasChanged) {
        this.$store.dispatch('cart/saveCart');
        this.hasChanged = false;
      }
      this.$router.go(-1);
    }
  },

  mounted() {
    window.addEventListener('beforeunload', (event) => {
      if (this.hasChanged) {
        event.preventDefault();
        event.returnValue='';
        return window.alert("Discard changes?");
      }
      return true;
    })
  }

};
</script>
