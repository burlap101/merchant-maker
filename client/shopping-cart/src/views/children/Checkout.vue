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
    <div 
      v-for="(error, index) in errors"
      v-bind:key="index"
      class="alert alert-danger"
      role="alert"
    >
      {{index}}.  {{error}}
    </div>
    <div class="row">
      <div class="col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Your cart</span>
          <span class="badge badge-secondary badge-pill">{{cart|length}} <a href="{% url 'shopping_cart' %}"><i class="fas fa-edit"></i></a></span>
        </h4>
        <ul class="list-group mb-3">
          {% for item in cart %}
              <li class="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 class="my-0">{{item.course.course_code}} for {{item.qty}} students</h6>
                  <small class="text-muted">{{item.course.title}} at {{item.training_session.location}}, {{item.training_session.session_date}}</small>
                </div>
                <span class="text-muted">${{item.total_cost|floatformat:2}}</span>
              </li>
          {% endfor %}
          <li class="list-group-item d-flex justify-content-between">
            <span>Total (AUD)</span>
            <strong>${{grand_total|floatformat:2}}</strong>
          </li>
        </ul>

        <form class="card p-2">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Promo code">
            <div class="input-group-append">
              <button type="submit" class="btn btn-secondary">Redeem</button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-md-8 order-md-1">
        <h4 class="mb-3 text-muted">Billing Details</h4>
        <form action="{% url 'checkout' %}" method="post" id="payment-form">
          {% csrf_token %}
          <input name="cart_amount" type="hidden" value="{{grand_total|floatformat:2}}" />
          {{ form|crispy }}
          <div class="mb-3 custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="save-info">
            <label class="custom-control-label" for="save-info" checked>Can we contact you in the future regarding your competencies?</label>
          </div>
          <h4 class="mb-3 text-muted">Payment Method</h4>
          <div class="mb-3 custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="cc-payment-selected">
            <label class="custom-control-label" for="cc-payment-selected">Credit or Debit Card</label>
          </div>
          <div id="cc-field" class="d-none">
            <label for="card-element">
              Credit or Debit Card
            </label>
            <div class="form-control" id="card-element">
              <!-- A Stripe Element will be inserted here. -->
            </div>

            <!-- Used to display form errors. -->
            <div class="text-danger" id="card-errors" role="alert"></div>
            <div class="my-3 custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="student-agreement">
              <label class="custom-control-label" for="student-agreement">I accept all terms of the <a target="_blank" href="https://www.allenstraining.com.au/students/student-information.aspx">Student Agreement</a></label>
            </div>
            <button id="submit-payment-btn" type="submit" class="btn btn-primary mt-3" disabled>Submit Payment</button>
          </div>
        </form>
        <div id="payment-submitted-spinner" class="d-none">
          <div  class="spinner-border text-primary mt-3" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "checkout",
  data() {
    return {
      errors: [],
      products: [],
      trainingSessions: []
    }
  }
}
</script>