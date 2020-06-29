<template>
  <div class="container">
    <div class="row mt-dual-navbar">
      <div class="mt-5 pb-3">
        <h2>Checkout</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 order-md-2 mb-4">
        <shopping-cart-preview />
        <form class="card p-2">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Promo code" />
            <div class="input-group-append">
              <button class="btn btn-secondary">Redeem</button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-md-8 order-md-1">
        <div
          v-if="errors.length + viewErrors.length > 0"
          class="alert alert-danger"
          role="alert"
        >
          <p v-for="(error, index) in errors" v-bind:key="index">
            {{ index + 1 }}. {{ error }}
          </p>
          <p v-for="(error, index) in viewErrors" v-bind:key="index">
            {{ index + 1 }}. {{ error }}
          </p>
        </div>
        <div class="alert alert-success" v-if="paymentSuccess">
          Payment Successful
        </div>
        <div id="payment-form">
          <core-details-form />
          <div v-if="products.length > 0">
            <address-form addressType="shipping" />
            <div class="mb-3 custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="save-info"
                v-model="isSameAddress"
                v-bind:checked="isSameAddress"
              />
              <label class="custom-control-label" for="save-info"
                >Billing address the same as shipping</label
              >
            </div>
            <address-form v-if="!isSameAddress" addressType="billing" />
          </div>
          <!-- End of Addresses -->

          <div
            v-if="trainingSessions.length > 0"
            class="mb-3 custom-control custom-checkbox"
          >
            <input
              type="checkbox"
              class="custom-control-input"
              id="save-info"
              v-bind:checked="contactable"
              v-on:change="contactableChanged($event)"
            />
            <label class="custom-control-label" for="save-info"
              >Can we contact you in the future regarding your
              competencies?</label
            >
          </div>
          <h4 class="mb-3 mt-5 text-muted">Payment Method</h4>
          <div class="mb-3 custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="cc-payment-selected"
              v-bind:checked="ccPaymentSelected"
            />
            <label class="custom-control-label" for="cc-payment-selected"
              >Credit or Debit Card</label
            >
          </div>
          <div id="cc-field" class="">
            <label for="card-element">
              Credit or Debit Card
            </label>
            <div class="form-control" id="card-element" ref="card-element">
              <!-- A Stripe Element will be inserted here. -->
            </div>

            <!-- Used to display form errors. -->
            <div class="text-danger" id="card-errors" role="alert"></div>
            <div class="my-3 custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="student-agreement"
                v-model="acceptedStudentAgreement"
              />
              <label class="custom-control-label" for="student-agreement"
                >I accept all terms of the
                <a
                  target="_blank"
                  href="https://www.allenstraining.com.au/students/student-information.aspx"
                  >Student Agreement</a
                ></label
              >
            </div>
            <button
              id="submit-payment-btn"
              class="btn btn-primary mt-3"
              v-bind:disabled="paymentProcessing"
              v-on:click="submit"
            >
              Submit Payment
            </button>
          </div>
        </div>
        <div v-if="paymentProcessing" id="payment-submitted-spinner" class="">
          <div class="spinner-border text-primary mt-3" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import AddressForm from "../../components/AddressForm.vue";
import CoreDetailsForm from "../../components/CoreDetailsForm.vue";
import ShoppingCartPreview from "../../components/ShoppingCartPreview.vue";
import keys from "../../assets/localconfig/keys";
import { mapGetters, mapState } from "vuex";
import { CustomersService } from "../../assets/js/CustomersService";
import { OrdersService } from "../../assets/js/OrdersService";

export default {
  name: "checkout",

  components: {
    AddressForm,
    CoreDetailsForm,
    ShoppingCartPreview
  },

  data() {
    return {
      ccPaymentSelected: true,
      card: undefined,
      paymentProcessing: false,
      paymentSuccess: false,
      stripe: undefined,
      isSameAddress: false,
      viewErrors: [],
      acceptedStudentAgreement: false
    };
  },

  computed: {
    ...mapState({
      products: state => state.cart.products,
      trainingSessions: state => state.cart.trainingSessions,
      shippingAddress: state => state.customer.shippingAddress,
      billingAddress: state => state.customer.billingAddress,
      contactable: state => state.customer.contactable,
      order: state => state.order,
      coreDetails: state => state.customer.coreDetails,
      errors: state => state.customer.errors,
      clientSecret: state => state.cart.clientSecret
    }),
    ...mapGetters("cart/", ["grandTotal"])
  },

  watch: {
    grandTotal: async function() {
      try {
        if (this.grandTotal > 0) {
          await this.$store.dispatch("cart/setClientSecret", {
            grandTotal: this.grandTotal * 100
          });
        }
      } catch (err) {
        this.viewErrors.push(err.message);
        throw err;
      }
    }
  },

  methods: {
    contactableChanged: function(event) {
      this.$store.commit("customer/isContactable", {
        contactable: event.target.value === "checked" ? true : false
      });
    },

    courseOnlyCustomer: async function() {
      let customer = undefined;
      try {
        customer = await CustomersService.createTrainingOnlyCustomer(
          this.coreDetails,
          this.contactable
        );
        await OrdersService.open({
          customer,
          trainingSessions: this.order.trainingSessions
        });
      } catch (err) {
        this.viewErrors.push(err.message);
        this.paymentProcessing = false;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        return;
      }

      this.$store.commit("customer/validateCoreFieldsOnly");

      return customer;
    },

    normalCustomer: async function() {
      let customer = undefined;

      try {
        customer = await CustomersService.create(
          this.coreDetails,
          this.shippingAddress,
          this.billingAddress,
          this.contactable
        );
        await OrdersService.open({
          customer,
          trainingSessions: this.order.trainingSessions
        });
      } catch (err) {
        this.viewErrors.push(err.message);
        this.paymentProcessing = false;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        return;
      }

      if (this.isSameAddress) {
        this.$store.commit("customer/copyShippingToBillingAddress");
      }
      this.$store.commit("customer/validateFields");

      return customer;
    },

    submit: async function() {
      this.viewErrors = [];
      if (!this.acceptedStudentAgreement) {
        this.viewErrors.push(
          "Please accept the Student Agreement by selecting the checkbox above the submit button."
        );
        return;
      }
      this.paymentProcessing = true;
      let customer = undefined;
      await this.$store.dispatch("order/populateTrainingSessionData", {trainingSessions: this.trainingSessions})

      if (this.trainingSessions.length > 0 && this.products.length === 0) {
        customer = this.courseOnlyCustomer();
      } else {
        customer = this.normalCustomer();
      }

      if (customer === undefined) {
        this.viewErrors.push(
          "There was a problem processing details. Please try again later."
        );
      }

      if (this.errors.length + this.viewErrors.length > 0) {
        this.paymentProcessing = false;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        return;
      }

      let result = await this.stripe.confirmCardPayment(this.clientSecret, {
        payment_method: {
          card: this.card,
          billing_details: {
            name: this.coreDetails.name,
            email: this.coreDetails.email
          }
        },
        receipt_email: this.coreDetails.email
      });
      if (result.error) {
        this.viewErrors.push(
          "There was a problem processing your payment. Please try again."
        );
      } else if (result.paymentIntent.status === "succeeded") {
        this.paymentSuccess = true;
        try {
          let orderObj = await OrdersService.deinitialise();
          this.$store.commit("order/updateFields", orderObj);

          await this.$store.dispatch("cart/deleteTrainingCart", {
            headers: {
              "X-CSRFToken": this.$cookie.get("csrftoken")
            }
          });
          this.$router.push("/payment-success");
        } catch (err) {
          this.viewErrors.push(err.message);
        }
      }
      this.paymentProcessing = false;
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },

  async created() {
    try {
      let orderObj = await OrdersService.initialise();
      this.$store.commit("order/updateFields", orderObj);
    } catch (err) {
      this.viewErrors.push(err.message);
      throw err;
    }
  },

  async mounted() {
    this.stripe = await loadStripe(keys.stripePublicKey);
    let elements = this.stripe.elements();
    let card = elements.create("card", {
      style: { base: { color: "#32325d" } }
    });
    card.mount(this.$refs["card-element"]);
    card.addEventListener("change", ({ error }) => {
      if (error) {
        this.viewErrors.push(error.message);
      } else {
        this.viewErrors = [];
        this.card = card;
      }
    });
  }
};
</script>
