<template>
<div class="row">
  <div class="col-md-6">
    <label for="shipping-type-select" class="">Shipping Type</label>
    <select
      class="form-control mb-3"
      id="shipping-type-select"
      v-model="shippingTypeIdSelected"
      v-on:change="selectionChanged"
    >
      <option
        v-for="(type, index) in shippingTypes"
        v-bind:key="index"
        v-bind:value="type._id"
      >
        {{ type.name }}
      </option>
      <option value="-1">Create new shipping type...</option>
    </select>
    <add-shipping-type v-if="newTypeSelected" />
  </div>
</div>
</template>

<script>
import { mapState } from "vuex";
import AddShippingType from "./AddShippingType.vue";

export default {
  name: "shipping-type-selection",
  components: {
    AddShippingType
  },
  data() {
    return {
      shippingTypeIdSelected: "",
      shippingTypeSelected: {},
      newTypeSelected: false
    };
  },
  computed: {
    ...mapState({
      errors: state => state.shipping.errors,
      shippingTypes: state => state.shipping.types
    })
  },
  methods: {
    selectionChanged: function() {
      if (this.shippingTypeIdSelected == -1) {
        this.newTypeSelected = true;
      } else if (this.shippingTypeIdSelected) {
        this.shippingTypeSelected = this.shippingTypes.find(
          el => el._id === this.shippingTypeIdSelected
        );
      }
    }
  }
};
</script>
