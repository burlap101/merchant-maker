<template>
  <div class="container">
    <div class="row mt-dual-navbar">
      <div class="mt-5 pb-3">
        <h2>Checkout</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 order-md-2 mb-4">
        <shopping-cart-preview
          v-bind:products="products"
          v-bind:trainingSessions="trainingSessions"
        />
        <form class="card p-2">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Promo code" />
            <div class="input-group-append">
              <button type="submit" class="btn btn-secondary">Redeem</button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-md-8 order-md-1">
        <h4 class="mb-3 text-muted">Billing Details</h4>
        <div
          v-for="(error, index) in errors"
          v-bind:key="index"
          class="alert alert-danger"
          role="alert"
        >
          {{ index + 1 }}. {{ error }}
        </div>
        <div class="alert alert-success" v-if="paymentSuccess">
          Payment Successful
        </div>
        <div id="payment-form">
          <div
            class="mb-3"
            v-for="(fieldname, index) of Object.keys(formFields)"
            v-bind:key="index"
          >
            <div v-if="!fieldname.toLowerCase().includes('address')">
              <label v-bind:for="fieldname" class="">{{ fieldname }}</label>
              <input
                v-bind:id="fieldname"
                type="text"
                class="form-control"
                v-model="formFields[fieldname]"
              />
            </div>
          </div>
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
                >Same as shipping</label
              >
            </div>
            <address-form v-if="!isSameAddress" addressType="billing" />
            
            
            <div v-if="!isSameAddress">
              <div
                class="mb-3"
                v-for="(fieldname, index) of Object.keys(
                  formFields.billingAddress
                )"
                v-bind:key="index"
              >
                <label v-bind:for="fieldname" class="">{{ fieldname }}</label>
                <input
                  v-bind:id="fieldname"
                  type="text"
                  class="form-control"
                  v-model="formFields.billingAddress[fieldname]"
                />
              </div>
            </div>
          </div>
          <!-- End of Addresses -->

          <!-- <div class="text-muted mt-5 mb-3">
              {{fieldname}}
            </div>
            <div
              class="mb-3"
              v-for="(childFieldname, index) in Object.keys(formFields[fieldname])"
              v-bind:key="index"
            >
              <label v-bind:for="childFieldname" class="">{{
                childFieldname
              }}</label>
              <input
                v-bind:id="childFieldname"
                type="text"
                class="form-control"
                v-model="formFields[fieldname][childFieldname]"
              />
            </div> -->

          <div
            v-if="trainingSessions.length > 0"
            class="mb-3 custom-control custom-checkbox"
          >
            <input
              type="checkbox"
              class="custom-control-input"
              id="save-info"
              v-model="saveInfo"
            />
            <label class="custom-control-label" for="save-info" checked
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
import ShoppingCartPreview from "../../components/ShoppingCartPreview.vue";
import keys from "../../assets/localconfig/keys";
import { ShoppingCartService } from "../../assets/js/ShoppingCartService";
import { mapState, mapGetters } from "vuex";

const states = ["NSW", "ACT", "QLD", "SA", "WA ", "TAS", "NT"];
export default {
  name: "checkout",

  components: {
    AddressForm,
    ShoppingCartPreview
  },

  data() {
    return {
      errors: [],
      saveInfo: false,
      ccPaymentSelected: true,
      formFields: {
        name: "",
        email: "",
        phone: "",
        billingAddress: {
          street: "",
          suburb: "",
          postcode: "",
          state: ""
        }
      },
      card: undefined,
      paymentProcessing: false,
      paymentSuccess: false,
      states: states,
      stripe: undefined,
      clientSecret: "",
      isSameAddress: false
    };
  },

  computed: {
    ...mapState({
      products: state => state.products,
      trainingSessions: state => state.trainingSessions
    }),
    ...mapGetters([
      'grandTotal',
      'cartLength'
    ])
  },

  methods: {
    submit: async function() {
      this.paymentProcessing = true;
      let result = await this.stripe.confirmCardPayment(this.clientSecret, {
        payment_method: {
          card: this.card,
          billing_details: {
            name: this.formFields.name
          }
        }
      });
      if (result.error) {
        this.errors.push(
          "There was a problem processing your payment. Please try again."
        );
      } else if (result.paymentIntent.status === "succeeded") {
        for (let field in this.formFields) {
          console.log("Here");
          if (Object.keys(this.formFields[field]) > 0) {
            for (let childField in this.formFields[field]) {
              this.formFields[field][childField] = "";
              console.log(childField);
            }
          } else {
            this.formFields[field] = "";
          }
        }
        this.paymentSuccess = true;
      }
      this.paymentProcessing = false;
    }
  },

  async created() {
    try {
      this.clientSecret = (
        await ShoppingCartService.paymentIntentSecret()
      ).secret;
    } catch (err) {
      this.errors.push(err.message);
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
        this.errors.push(error.message);
      } else {
        this.errors = [];
        this.card = card;
      }
    });
  }
};
</script>
