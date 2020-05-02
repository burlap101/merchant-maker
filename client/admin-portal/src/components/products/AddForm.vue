<template>
  <div v-on:keypress.enter="submit">
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
    <h4 class="my-3">Category</h4>
    <category-selection
      v-on:category-object="formData.category = $event"
      v-bind:categories-selected="{}"
      v-on:reset-categories="formData.category = {}"
    />
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
      <image-upload
        v-bind:images="images"
        v-on:new-image="formData.images.push(image)"
      />
      <additional-attributes
        v-bind:attributes="formData.attributes"
        v-on:new-attribute="$set(this.formData.attributes, attr, '')"
      />
      <button v-on:click="submit" class="btn btn-primary mt-4">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { ProductValidation } from "../../assets/js/ProductValidation";
import { ProductFields } from "@/assets/js/ProductFields";
import { ProductsService } from "@/assets/js/ProductsService";
import CategorySelection from "./CategorySelection.vue";
import AdditionalAttributes from "./AdditionalAttributes.vue";
import ImageUpload from "./ImageUpload.vue";

export default {
  name: "add-form",
  components: {
    CategorySelection,
    AdditionalAttributes,
    ImageUpload
  },
  data() {
    return {
      formData: {
        category: {}
      },
      errors: [],
      attrName: "",
      added: false,
      currentImageFileName: "",
      images: [],
      isFormValid: undefined,
      fieldsObj: ProductFields,
      ProductsService: ProductsService
    };
  },
  methods: {
    submit: async function() {
      if (!this.validateFormData()) {
        return;
      }

      // this.formData.images = this.images;

      try {
        this.ProductsService.addProduct(this.formData);
        this.added = true;
        this.errors = [];
        await this.initialiseFormData();
      } catch (err) {
        this.errors.push(
          err.message
        );
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
            !ProductValidation.validateTextField(
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
            !ProductValidation.validateNumberField(
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
    }
  },
  async created() {
    await this.initialiseFormData();
  }
};
</script>
