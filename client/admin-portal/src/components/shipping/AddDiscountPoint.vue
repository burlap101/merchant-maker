<template>
  <div class="needs-validation">
    <h4 class="h5 my-3">Discount Point {{ dpIndex + 1 }}</h4>
    <div v-if="errors.length > 0" class="alert alert-danger" role="alert">
      <div class="h5">Errors</div>
      <ol class="">
        <li
          v-for="(error, index) in errors"
          class=""
          v-bind:key="'error-' + index"
        >
          {{ error }}
        </li>
      </ol>
    </div>
    <div class="row">
      <div
        v-for="(field, index) in fieldsObj.number"
        class="col-md-2 mb-3"
        v-bind:key="'number-field-' + index"
      >
        <label v-bind:for="field.id">{{ field.label }}</label>
        <i
          class="far fa-question-circle ml-2 text-muted"
          data-toggle="tooltip"
          data-placement="right"
          v-bind:title="field.hint"
        >
        </i>
        <input
          type="number"
          class="form-control"
          v-bind:class="{ 'is-invalid': errors.length > 0 }"
          v-bind:id="field.id"
          v-bind:placeholder="'e.g. ' + field.example"
          v-model="formData[field.id]"
          v-bind:step="field.step"
          v-on:change="debounceSubmit"
        />
      </div>
      <div class="d-inline-flex align-items-center p-2 text-danger">
        <i v-on:click="remove" class="far fa-trash-alt"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { DiscountPointFields } from "@/assets/js/DiscountPointFields";
import { Validation } from "@/assets/js/Validation";
import _ from "lodash";

export default {
  name: "add-discount-point",
  props: ["dpIndex"],
  data() {
    return {
      formData: {},
      fieldsObj: DiscountPointFields,
      errors: []
    };
  },
  methods: {
    debounceSubmit: function() {
      _.debounce(this.submit, 300)();
    },
    submit: function() {
      this.errors = [];
      if (!this.validate()) {
        return;
      }
      this.$emit("updated", this.formData);
    },
    validate: function() {
      const numberFields = this.fieldsObj.number;

      let allValid = true;

      for (let field in numberFields) {
        try {
          if (
            !Validation.validateNumberField(
              this.formData[numberFields[field].id],
              numberFields[field].required,
              numberFields[field].specialValues,
              numberFields[field].min,
              numberFields[field].max
            )
          ) {
            this.errors.push(
              numberFields[field].label +
                " field " +
                numberFields[field].errorMsg.toLowerCase()
            );
            allValid = false;
          }
        } catch (err) {
          allValid = false;
          this.errors.push(
            numberFields[field].label + " " + err.message.toLowerCase()
          );
        }
      }
      return allValid;
    },
    remove: function() {
      this.$emit("remove", this.dpIndex);
    }
  }
};
</script>

<style scoped lang="scss">
.fa-trash-alt {
  font-size: x-large;
  &:hover {
    cursor: pointer;
  }
}
</style>
