<template>
  <div class="needs-validation">
    <div
      v-for="(field, index) in fieldsObj.text"
      class="row"
      v-bind:key="'text-field-' + index"
    >
      <div class="col mb-3">
        <label v-bind:for="field.id">
          {{ field.label }}
          <small class="text-muted" v-if="!field.required">
            (optional)
          </small>
        </label>
        <i
          class="far fa-question-circle ml-2 text-muted"
          data-toggle="tooltip"
          data-placement="right"
          v-bind:title="field.hint"
        >
        </i>
        <input
          type="text"
          class="form-control"
          v-bind:id="field.id"
          v-bind:placeholder="'e.g. ' + field.example"
          v-model="formData[field.id]"
        />
      </div>
    </div>
    <div
      v-for="(field, index) in fieldsObj.textArea"
      class="row"
      v-bind:key="'number-field-' + index"
    >
      <div class="col mb-3">
        <label v-bind:for="field.id">{{ field.label }}</label>
        <i
          class="far fa-question-circle ml-2 text-muted"
          data-toggle="tooltip"
          data-placement="right"
          v-bind:title="field.hint"
        >
        </i>
        <textarea
          class="form-control"
          v-bind:id="field.id"
          v-bind:placeholder="'e.g. ' + field.example"
          v-model="formData[field.id]"
          rows="4"
        />
      </div>
    </div>
    <div
      v-for="(field, index) in fieldsObj.boolean"
      class="row"
      v-bind:key="'number-field-' + index"
    >
      <div class="col mb-3">
        <div class="custom-control custom-checkbox">
          <input
            class="custom-control-input"
            v-bind:id="field.id"
            v-model="formData[field.id]"
            v-bind:value="field.value"
            v-on:change="$emit('toggled', this.formData[field.id])"
            type="checkbox"
          />
          <label class="custom-control-label" v-bind:for="field.id">{{
            field.label
          }}</label>
          <i
            class="far fa-question-circle ml-2 text-muted"
            data-toggle="tooltip"
            data-placement="right"
            v-bind:title="field.hint"
          >
          </i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ShippingTypeFields } from "@/assets/js/ShippingTypeFields";
import { mapState } from "vuex";
import _ from "lodash";

export default {
  name: "add-shipping-type",
  data() {
    return {
      formData: {},
      isValid: undefined,
      fieldsObj: ShippingTypeFields
    };
  },
  computed: {
    ...mapState({
      errors: state => state.shipping.errors
    })
  },
  methods: {
    debounceSubmit: function() {
      _.debounce(this.submit, 300)();
    },
    submit: function() {
      if (!this.validate()) {
        return;
      }
      this.$store.commit('shipping/submit')
    },
    validate: function() {
    }
  }
};
</script>
