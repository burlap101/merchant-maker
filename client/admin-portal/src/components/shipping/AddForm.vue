<template>
  <div v-on:keypress.enter="submit" class="pb-5">
    <div v-if="added" class="alert alert-success" role="alert">
      Record added successfully
    </div>
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
    <h4 class="my-3">Type</h4>

    <!-- Shipping type component gets added here -->

    <shipping-type-selection />

    <div class="needs-validation">
      <h4 class="my-3">Details</h4>
      <div
        v-for="(field, index) in fieldsObj.text"
        class="row"
        v-bind:key="'text-field-' + index"
      >
        <div class="col-md-6 mb-3">
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
        v-for="(field, index) in fieldsObj.number"
        class="row"
        v-bind:key="'number-field-' + index"
      >
        <div class="col-md-6 mb-3">
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
            v-bind:id="field.id"
            v-bind:placeholder="'e.g. ' + field.example"
            v-model="formData[field.id]"
            v-bind:step="field.step"
          />
        </div>
      </div>
      <div
        v-for="(field, index) in fieldsObj.textArea"
        class="row"
        v-bind:key="'number-field-' + index"
      >
        <div class="col-md-6 mb-3">
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
      <div class="needs-validation">
        <h4 class="my-3">Discount Points</h4>
        <add-discount-point
          v-for="(item, index) in formData.discounts"
          v-bind:key="index"
          v-bind:dpIndex="index"
          v-on:errors="$event.forEach(error => errors.push(error))"
          v-on:remove="formData.discounts.splice(index, 1)"
          v-on:updated="formData.discounts.splice(index, 1, $event)"
        />
        <div>
          <button
            class="btn btn-success"
            v-on:click="
              formData.discounts.push({ point: undefined, discount: undefined })
            "
          >
            Add
          </button>
        </div>
      </div>

      <button v-on:click="submit" class="btn btn-primary mt-4">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { Validation } from "../../assets/js/Validation";
import { ShippingMethodFields } from "@/assets/js/ShippingMethodFields";
import AddDiscountPoint from "./AddDiscountPoint.vue";
import ShippingTypeSelection from "./ShippingTypeSelection.vue";
import { ShippingService } from "@/assets/js/ShippingService";
import { mapState } from "vuex";

export default {
  name: "add-form",
  components: {
    AddDiscountPoint,
    ShippingTypeSelection
  },
  data() {
    return {
      formData: {
        discounts: [{ point: undefined, discount: undefined }],
        shippingType: {}
      },
      added: false,
      isFormValid: undefined,
      fieldsObj: ShippingMethodFields
    };
  },
  computed: {
    ...mapState({
      errors: state => state.shipping.errors,
      shippingTypes: state => state.shipping.types
    })
  },
  methods: {
    submit: async function() {
      if (!this.validateFormData()) {
        return;
      }

      try {
        await ShippingService.add(this.formData);
        this.added = true;
        this.errors = [];
        await this.initialiseFormData();
      } catch (err) {
        this.$store.commit("shipping/addError", {
          message: err.message
        });
        this.added = false;
      }
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    textFieldValidation: function(fieldObj) {
      if (fieldObj.re.test(fieldObj.value)) {
        fieldObj.isValid = true;
      } else {
        fieldObj.isValid = false;
      }
    },
    textAreaValidation: function(fieldObj) {
      if (
        fieldObj.re.test(fieldObj.value) ||
        fieldObj.value.length < fieldObj.maxLength
      ) {
        fieldObj.isValid = true;
        // this.isFormValid = undefined;
      } else {
        fieldObj.isValid = false;
      }
    },
    validateFormData: function() {
      const textFields = this.fieldsObj.text;
      const numberFields = this.fieldsObj.number;

      let allValid = true;
      for (let field in textFields) {
        try {
          if (
            !Validation.validateTextField(
              this.formData[textFields[field].id],
              textFields[field].required,
              textFields[field].re
            )
          ) {
            this.$store.commit("shipping/addError", {
              message:
                textFields[field].label +
                " field " +
                textFields[field].errorMsg.toLowerCase()
            });
            allValid = false;
          }
        } catch (err) {
          allValid = false;
          this.$store.commit("shipping/addError", {
            message: textFields[field].label + " " + err.message.toLowerCase()
          });
        }
      }
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

      if (!allValid) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }

      return allValid;
    },
    initialiseFormData: async function() {
      for (let fieldTypeName in this.fieldsObj) {
        for (let fieldName in this.fieldsObj[fieldTypeName]) {
          this.formData[
            this.fieldsObj[fieldTypeName][fieldName].id
          ] = _.cloneDeep(this.fieldsObj[fieldTypeName][fieldName].value);
        }
      }
    }
  },
  async created() {
    await this.initialiseFormData();
    shipping;
  }
};
</script>
