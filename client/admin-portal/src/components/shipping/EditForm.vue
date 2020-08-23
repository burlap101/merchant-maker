<template>
  <div v-on:keypress.enter="submit">
    <div v-if="confirmDestroy">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Are you sure?</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  v-on:click="confirmDestroy = false"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>This will destroy the record and can't be undone.</p>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  v-on:click="confirmDestroy = false"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  v-on:click="destroyRecord()"
                >
                  Destroy
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div v-if="added" class="alert alert-success" role="alert">
      Record updated successfully
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
    <div class="row my-2">
      <div class="col-md-6">
        <button class="btn btn-danger" v-on:click="confirmDestroy = true">
          Destroy Record
        </button>
      </div>
    </div>
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
import { ProductsService } from "../../assets/js/ProductsService";
import CategorySelection from "./CategorySelection.vue";
import AdditionalAttributes from "./AdditionalAttributes.vue";
import ImageUpload from "./ImageUpload.vue";

const baseUrl = window.location.hostname.includes("yambagraftonfirstaid.com.au")
  ? "/store"
  : "";

export default {
  name: "edit-form",
  props: ["id"],
  components: {
    
  },
  data() {
    return {
      formData: {
        category: {},
        attributes: {}
      },
      errors: [],
      attrName: "",
      isSaving: false,
      added: false,
      isFormValid: undefined,
      fieldsObj: ShippingMethodFields,
      confirmDestroy: false
    };
  },
  methods: {
    submit: async function() {
      if (!this.validateFormData()) {
        return;
      }

      try {
        await ShippingService.update(this.id, this.formData);
        this.added = true;
        this.errors = [];
        await this.initialiseFormData();
      } catch (err) {
        this.errors.push(err.message);
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
            this.errors.push(
              textFields[field].label +
                " field " +
                textFields[field].errorMsg.toLowerCase()
            );
            allValid = false;
          }
        } catch (err) {
          allValid = false;
          this.errors.push(
            textFields[field].label + " " + err.message.toLowerCase()
          );
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
      this.formData.attributes = {};
    },
    destroyRecord: async function() {
      try {
        await ShippingService.deleteOne(this.id);
        this.$router.push("/shipping");
      } catch (err) {
        this.errors.push(err.message);
      }
    }
  },
  async created() {
    try {
      this.formData = Object.assign(
        {},
        this.formData,
        await ShippingService.findOne(this.id)
      );
    } catch (err) {
      this.errors.push(err.message);
    }
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-enter {
  opacity: 0;
}
</style>
