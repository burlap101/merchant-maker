<template>
  <div class="container mt-dual-navbar">
    <div class="row">
      <div class="col">
        <h3 class="mt-5">Booking Successful</h3>
        <div v-if="order.id" class="mt-3">
          Your order no. is: <strong>{{ order.id }}</strong>
        </div>
        <div class="mt-3">
          Thankyou for your booking. A copy of your receipt has been emailed to
          <strong>{{ customer.coreDetails.email }}</strong> <br />
          <span v-if="cart.trainingSessions.length > 0">
          We will be in contact with you shortly to confirm the course and
          student details.
          </span>
          <div v-if="cart.trainingSessions.length > 0 && cart.products.length > 0" class="mt-2">
            Also...
          </div>
          <div v-if="cart.products.length > 0" class="mt-2">
            We will be in contact with you shortly regarding the status of your products. 
          </div>
        </div>
        <div class="mt-5">
          <a href="/">Return home</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "payment-success",

  computed: {
    ...mapState({
      customer: state => state.customer,
      order: state => state.order,
      cart: state => state.cart
    })
  }
};
</script>
