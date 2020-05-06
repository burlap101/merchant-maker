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
          <div class="row">
            <div class="col-6">
              <h6 class="my-0">
                {{ item.product.stockCode }} - {{ item.product.name }}
              </h6>
              <small class="text-muted">
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
            <div class="col-2 text-center">
              <h6>Qty</h6>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="item.qty"
                  min="1"
                  v-bind:max="item.product.available"
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
              ${{ (item.qty * item.product.price).toFixed(2) }}
            </div>
            <div class="col-1">
              <a class="text-secondary"
                ><i class="far fa-trash-alt fa-lg"></i
              ></a>
            </div>
          </div>
        </li>
        <li class="list-group-item">
          <div class="row">
            <div class="col-8">
              <h6>Grand Total (AUD)</h6>
            </div>
            <div id="grand-total" class="col-3 text-right">
              <strong>${{ grandTotal.toFixed(2) }}</strong>
            </div>
          </div>
        </li>
      </ul>
      <div class="row">
        <div class="col-lg-8">
          <router-link to="checkout"
            ><button id="checkout-button" class="btn btn-primary">
              Checkout
            </button></router-link
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
  name: "shopping-cart",

  data() {
    return {
      errors: [],
    };
  },

  computed: {
    ...mapState({
      products: state => state.products,
      trainingSessions: state => state.trainingSessions,
    }),
    ...mapGetters([
      'grandTotal',
      'cartLength'
    ])
  }
  
};
</script>
