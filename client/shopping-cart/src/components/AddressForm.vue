<template>
  <div>
    <div class="h5 text-muted mt-4 mb-3">
      {{ addressType.charAt(0).toUpperCase() + addressType.slice(1) }} Address
    </div>
    <div
      class="mb-3 form-group"
      v-for="(field, index) in fields.text"
      v-bind:key="index"
    >
      <label v-bind:for="field.id" class="">{{ field.label }}</label>
      <input
        v-bind:id="field.id"
        type="text"
        class="form-control"
        v-bind:value="$store.state.customer[midField][field.id]"
        v-on:change="updateStore($event, field.id)"
      />
    </div>
    <div class="mb-3 form-group">
      <label v-bind:for="addressType + '-state'">
        {{ fields.select.state.label }}
      </label>
      <select
        v-bind:name="addressType + '-state'"
        v-bind:id="addressType + '-state'"
        class="form-control"
        v-bind:value="$store.state.customer[midField].state"
        v-on:change="updateStore($event, fields.select.state.id)"
      >
        <option
          v-for="(state, index) in fields.select.state.options"
          v-bind:value="state"
          v-bind:key="index"
        >
          {{ state }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { AddressFields } from "../assets/js/AddressFields";

export default {
  name: "address-form",
  props: ["addressType"],
  data() {
    return {
      fields: AddressFields,
      midField: this.addressType + "Address"
    };
  },

  methods: {
    updateStore: function(event, fieldname) {
      let tempObj = {};
      tempObj[this.midField] = {};
      tempObj[this.midField][fieldname] = event.target.value;
      this.$store.commit("customer/updateFields", tempObj);
    }
  }
};
</script>
