<template>
  <div class="container">
    <div class="row mt-dual-navbar">
      <div class="mt-5 pb-3">
        <h2>Checkout</h2>
      </div>
    </div>
    <!-- {% if error %}
    <div id="invalid-alert-value-error" class="alert alert-danger" role="alert">
      There was an issue processing your booking, please take the time to review all fields and try again. <br />
      Alternatively please don't hesitate to <a href="{% url 'course_enquiry' %}">contact us.</a>
    </div>
    {% endif %}
    {% if card_error %}
    <div class="alert alert-danger" role="alert">
      There was an issue processing your chosen card. {{card_error.message}} <br />
      {{card_error.recommended_action}} <br />
      To arrange alternative payment options please don't hesitate to <a href="{% url 'course_enquiry' %}">contact us.</a>
    </div>
    {% endif %} -->
    <div class="row">
      <div class="col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Your cart</span>
          <span class="badge badge-secondary badge-pill"
            >{{ products.length + trainingSessions.length }}
            <a href="/shopping-cart"><i class="fas fa-edit"></i></a
          ></span>
        </h4>
        <ul class="list-group mb-3">
          <li
            v-for="(item, index) in trainingSessions"
            v-bind:key="index"
            class="list-group-item d-flex justify-content-between lh-condensed"
          >
            <div>
              <h6 class="my-0">
                {{ item.course.course_code }} for {{ item.qty }} students
              </h6>
              <small class="text-muted"
                >{{ item.course.title }} at
                {{ item.training_session.location }},
                {{ item.training_session.session_date }}</small
              >
            </div>
            <span class="text-muted">${{ item.total_cost.toFixed(2) }}</span>
          </li>
          <!-- {% for item in cart %}
              <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 class="my-0">{{item.course.course_code}} for {{item.qty}} students</h6>
                  <small class="text-muted">{{item.course.title}} at {{item.training_session.location}}, {{item.training_session.session_date}}</small>
                </div>
                <span class="text-muted">${{item.total_cost|floatformat:2}}</span>
              </li>
          {% endfor %} -->
          <li class="list-group-item d-flex justify-content-between">
            <span>Total (AUD)</span>
            <strong>${{ grandTotal }}</strong>
          </li>
        </ul>

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
          {{ index+1 }}. {{ error }}
        </div>
        <form id="payment-form">
          <div
            class="mb-3"
            v-for="(fieldname, index) in Object.keys(formFields)"
            v-bind:key="index"
          >
            <div v-if="Object.keys(formFields[fieldname])==0">
              <label v-bind:for="fieldname" class="">{{
                fieldname
              }}</label>
              <input
                v-bind:id="fieldname"
                type="text"
                class="form-control"
                v-model="formFields[fieldname]"
              />
            </div>
          </div>
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
          <h4 class="mb-3 text-muted">Payment Method</h4>
          <div class="mb-3 custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="cc-payment-selected"
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
              type="submit"
              class="btn btn-primary mt-3"
            >
              Submit Payment
            </button>
          </div>
        </form>
        <div id="payment-submitted-spinner" class="d-none">
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
import keys from "../../assets/localconfig/keys";

const states = ["NSW", "QLD", "ACT", "VIC", "NT", "SA", "WA", "TAS"];

export default {
  name: "checkout",
  data() {
    return {
      errors: [],
      products: [],
      trainingSessions: [],
      saveInfo: false,
      ccPaymentSelected: true,
      formFields: {
        name: "",
        email: "",
        phone: "",
        shippingAddress: {
          street: "",
          suburb: "",
          postcode: "",
          state: ""
        },
        billingAddress: {
          street: "",
          suburb: "",
          postcode: "",
          state: ""
        }
      },
      states: states
    };
  },
  computed: {
    grandTotal: function() {
      let result = 0;
      for (let item of this.trainingSessions) {
        result += item.total_cost;
      }
      return result;
    }
  },
  methods: {
    submit: async function() {
      console.log("submit pressed");
    }
  },
  async created() {
    let res = await fetch('/shopping-cart/secret');
    if (res.ok) {
      console.log(res)
      this.clientSecret = (await res.json()).secret;
      console.log(this.clientSecret);
    } else {
      this.errors.push("There was an error retrieving your cart.")
    }
  },
  async mounted() {
    let stripe = await loadStripe(keys.stripePublicKey);
    let elements = stripe.elements();
    let card = elements.create("card", { style: { base: { color: "#32325d" } } });
    card.mount(this.$refs['card-element']);
    card.addEventListener("change", ({ error }) => {
      if (error) {
        this.errors.push(error.message);
      } else {
        this.errors = [];
      }
    });
  }
};
</script>
