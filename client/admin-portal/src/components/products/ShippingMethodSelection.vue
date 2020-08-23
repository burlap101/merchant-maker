<template>
<div class="row">
  <div class="col-md-6">
    <label for="shipping-method-select" class="">Shipping Method</label>
    <select
      class="form-control mb-3"
      id="shipping-method-select"
      v-model="shippingMethodIdSelected"
      v-on:change="selectionChanged"
    >
      <option
        v-for="(method, index) in shippingMethods"
        v-bind:key="index"
        v-bind:value="method._id"
      >
        {{ method.name }}
      </option>
      <option value="-1">Create new shipping method...</option>
    </select>
    <!-- <add-shipping-type v-if="newTypeSelected" /> -->
  </div>
</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "shipping-method-selection",
  data() {
    return {
      shippingMethodIdSelected: "",
      shippingMethodSelected: {},
      newMethodSelected: false
    };
  },
  computed: {
    ...mapState({
      shippingMethods: state => state.shipping.methods
    })
  },
  methods: {
    selectionChanged: function() {
      if (this.shippingMethodIdSelected == -1) {
        this.newMethodSelected = true;
      } else if (this.shippingMethodIdSelected) {
        this.newMethodSelected = false;
        this.shippingMethodSelected = this.shippingMethods.find(
          el => el._id === this.shippingMethodIdSelected
        );
      }
    }
  }
};
</script>
