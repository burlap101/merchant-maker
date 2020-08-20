<template>
  <div>
    <div v-if="added" class="alert alert-success" role="alert">
      Record updated successfully
    </div>
    <div v-if="errors.length > 0" class="alert alert-danger" role="alert">
      <div class="h5">Errors</div>
      <ol>
        <li v-for="(error, index) in errors" v-bind:key="'error-' + index">
          {{ error }}
        </li>
      </ol>
    </div>
    <div class="col-md-6">
      <div class="d-flex justify-content-between">
        <div class="align-self-center h5">Status</div>
        <div class="d-flex">
          <div class="">
            <select
              v-model="formData.status"
              class="custom-select"
              name=""
              id=""
              v-on:change="statusUpdated = true"
            >
              <option value="open">Open</option>
              <option value="paid">Paid</option>
              <option value="complete">Complete</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div class="ml-4">
            <button
              class="btn btn-warning text-light"
              v-bind:disabled="!statusUpdated"
              v-on:click="updateStatus()"
            >
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
    <h4 class="my-3">Customer Details</h4>
    <div class="col-md-6">
      <div
        v-for="(field, index) in formData.customer.coreDetails"
        v-bind:key="'customer-' + index"
        class="mt-3"
      >
        <label class="text-capitalize" v-bind:for="'customer-field-' + index">
          {{ index }}
        </label>
        <input
          type="text"
          class="form-control"
          v-bind:id="'customer-field-' + index"
          v-model="formData.customer.coreDetails[index]"
          v-bind:disabled="!allowEdit"
        />
      </div>
      <h5 class="mt-4">Shipping Address</h5>
      <div
        v-for="(field, index) in formData.customer.shippingAddress"
        v-bind:key="'customer-' + index"
        class="mt-3"
      >
        <label class="text-capitalize" v-bind:for="'customer-field-' + index">
          {{ index }}
        </label>
        <input
          type="text"
          class="form-control"
          v-bind:id="'customer-field-' + index"
          v-model="formData.customer.shippingAddress[index]"
          v-bind:disabled="!allowEdit"
        />
      </div>
      <h5 class="mt-4">Billing Address</h5>
      <div
        v-for="(field, index) in formData.customer.billingAddress"
        v-bind:key="'customer-' + index"
        class="mt-3"
      >
        <label class="text-capitalize" v-bind:for="'customer-field-' + index">
          {{ index }}
        </label>
        <input
          type="text"
          class="form-control"
          v-bind:id="'customer-field-' + index"
          v-model="formData.customer.billingAddress[index]"
          v-bind:disabled="!allowEdit"
        />
      </div>
    </div>
    <h4 class="mt-4 mb-3">Cart</h4>
    <div class="col-md-6">
      <div class="d-flex justify-content-between">
        <div class="h6">Grand Total:</div>
        <div class="text-success text-right">
          ${{ formData.cart.total.toFixed(2) }}
        </div>
      </div>
    </div>
    <div class="table-responsive mytable col-md-8 pt-3">
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>UOM</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in formData.cart.items" v-bind:key="index">
            <td>
              {{ item.product.name }}
            </td>
            <td>${{ item.product.price.toFixed(2) }}</td>
            <td>
              {{ item.qty }}
            </td>
            <td>
              {{ item.product.uom }}
            </td>
            <td>${{ (item.product.price * item.qty).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { OrdersService } from "@/assets/js/OrdersService";

export default {
  name: "edit-form",
  props: ["id"],
  data() {
    return {
      errors: [],
      added: false,
      fieldLabels: [],
      formData: {
        customer: {},
        cart: {}
      },
      allowEdit: false,
      statusUpdated: false
    };
  },
  methods: {
    updateStatus: async function() {
      this.errors = [];
      this.added = false;
      if (this.formData.status === "complete") {
        try {
          await OrdersService.complete(this.id);
          this.added = true;
        } catch (err) {
          this.errors.push(err.message);
        }
      } else {
        this.errors.push[
          "Sorry but there is no support for the " +
            status +
            " yet. Please contact your administrator."
        ];
      }
    }
  },
  async created() {
    try {
      this.formData = Object.assign(
        {},
        this.formData,
        await OrdersService.findOne(this.id)
      );
      this.fieldLabels = Object.keys(this.formData.customer.coreDetails);
    } catch (err) {
      this.errors.push(err.message);
    }
  }
};
</script>
