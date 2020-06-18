<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-dialog">
        <div class="modal-content bg-">
          <div class="modal-header">
            <h5 class="modal-title text-dark ml-1">
              You've Selected
            </h5>
            <button
              type="button"
              class="close"
              v-on:click="$emit('close')"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger" v-if="errors.length > 0">
              <div class="h6">Errors:</div>
              <div v-for="(error, index) in errors" v-bind:key="index">
                {{ error }}
              </div>
              <div class="mt-2">
                Please try again later or
                <a href="/courses/enquiry/">contact us</a>.
              </div>
            </div>
            <div class="d-flex flex-row justify-content-between">
              <div class="d-flex flex-row mt-1">
                <img
                  v-if="product.images[0] !== undefined"
                  class="modal-image"
                  v-bind:src="product.images[0].path"
                />
                <img
                  v-else
                  src="../assets/img/img-not-found.svg.png"
                  alt=""
                  class="modal-image"
                />
                <div class="ml-3">
                  <div class="text-dark h6">{{ product.name }}</div>
                  <div class="">{{ product.description }}</div>
                </div>
              </div>
              <div class="">
                <div class="d-flex flex-column">
                  <label for="modal-qty" class="text-muted">Qty</label>
                  <input
                    id="modal-qty"
                    type="number"
                    class="form-control modal-input"
                    v-model="qty"
                  />
                  <small class="text-muted">{{ product.uom }}</small>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-body border-top">
            <div class="d-flex justify-content-between">
              <div class="text-dark">Item Total</div>
              <div>${{ (qty * product.price).toFixed(2) }}</div>
            </div>
          </div>
          <button v-on:click="buyNow()" class="container-fluid btn btn-primary">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "buy-now-modal",

  props: ["product"],

  data() {
    return {
      qty: 1
    };
  },

  computed: {
    ...mapState({
      cartErrors: state => state.cart.errors
    }),
    errors: function() {
      let errors = [];
      errors = errors.concat(this.cartErrors);
      return errors;
    }
  },

  methods: {
    buyNow: async function() {
      await this.$store.dispatch("cart/addProductToCart", {
        product: this.product,
        qty: this.qty
      });
      if (this.errors.length === 0) {
        location.assign("/store/cart/checkout");
      }
    }
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 10px 10px;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

/* .modal-body {
    margin: 20px 0;
  } */

.modal-default-button {
  float: right;
}

/*
  * The following styles are auto-applied to elements with
  * transition="modal" when their visibility is toggled
  * by Vue.js.
  *
  * You can easily play with the modal transition by editing
  * these styles.
  */
.modal-enter {
  opacity: 0;
}

.modal-image {
  display: block;
  width: 120px;
  height: auto;
}

.modal-input {
  max-width: 80px;
}
</style>
