<template>
  <div>
    <h4 class="mb-3 text-muted">Billing Details</h4>
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
        v-bind:value="coreDetails[field.id]"
        v-on:change="updateStore($event, field.id)"
      />
    </div>
  </div>
</template>
<script>
import { CoreFields } from "../assets/js/CoreFields";
import { mapState } from "vuex";

export default {
  name: "core-details-form",

  data() {
    return {
      fields: CoreFields
    }
  },

  computed: {
    ...mapState({
      coreDetails: state => state.customer.coreDetails,
    })
  },

  methods: {
    updateStore: function(event, fieldname) {
      let tempObj = {};
      tempObj.coreDetails = {};
      tempObj.coreDetails[fieldname] = event.target.value;
      this.$store.commit('customer/updateFields', tempObj)
    }
  }


}
</script>