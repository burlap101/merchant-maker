<template>
  <div v-on:keypress.enter="submit">
    <h4 class="mb-3">Details</h4>
    <div v-if="added" class="alert alert-success" role="alert">
      Record added successfully
    </div>
    <div v-if="errors.length > 0" class="alert alert-danger" role="alert">
      <div class="h5">Errors</div>
      <ol class="">
        <li
          v-for="(error, index) of errors"
          class=""
          v-bind:key="'error-' + index"
        >
          {{ error }}
        </li>
      </ol>
    </div>
    <div class="needs-validation">
      <div
        v-for="(field, index) of fieldsObj.text"
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
        v-for="(field, index) of fieldsObj.number"
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
        v-for="(field, index) of fieldsObj.textArea"
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
      <h4 class="my-3">
        Images
      </h4>
      <div
        v-for="(image, index) of images"
        v-bind:key="'image-upload-' + index"
        class="row"
      >
        <div class="col-md-6 mb-3">
          <input
            type="text"
            class="form-control"
            v-bind:id="'product-image-' + index"
            v-bind:name="'images-upload-' + index"
            disabled
            v-bind:value="image.originalname"
          />
          <!-- <label for="product-image" class="custom-file-label text-muted mx-3">
            {{ image.originalname }}
          </label> -->
        </div>
        <!-- <div class="col-md-6">
          <button
            v-on:click="addImageField(attrName)"
            class="btn btn-outline-success"
          >
            + Add
          </button>
        </div> -->
      </div>
      <div class="row container">
        <div class="col-md-6 my-pointer">
          <input
            type="file"
            class="custom-file-input"
            id="product-image"
            name="file"
            v-bind:disabled="isSaving"
            v-on:change="uploadImageFile('image-' + images.length, $event)"
            accept="image/*"
          />
          <label
            v-if="currentImageFileName === ''"
            for="product-image"
            class="custom-file-label text-muted"
          >
            Choose image
          </label>
          <label
            v-else
            for="product-image"
            class="custom-file-label text-muted"
          >
            {{ currentImageFileName }}
          </label>
        </div>
        <!-- <div class="col-md-6">
          <button class="btn btn-outline-success">
            + Add
          </button>
        </div> -->
      </div>
      <h3 class="h4 my-3">
        Additional Attributes
        <i
          class="h6 far fa-question-circle ml-2 text-muted"
          data-toggle="tooltip"
          data-placement="right"
          title="Any additional attributes that you would like to designate to distinguish this product from others that you may stock similar"
        >
        </i>
      </h3>
      <div
        class="row"
        v-for="(attr, index) of Object.keys(formData.attributes)"
        v-bind:key="index"
      >
        <label v-bind:for="attr">{{ attr }}</label>
        <div class="row">
          <div class="col-md-6 mb-3">
            <input
              type="text"
              class="form-control"
              v-bind:id="attr"
              v-bind:placeholder="
                'The ' + attr.toLowerCase() + ' of the ' + objectType
              "
              v-model="formData.attributes[attr]"
            />
          </div>
          <div class="col-md-6">
            <button
              v-on:click="deleteAttribute(attr)"
              class="btn btn-outline-danger"
            >
              - Remove
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <input
            type="text"
            class="form-control"
            id="attribute-name"
            v-bind:placeholder="'e.g. Size, Colour'"
            v-model="attrName"
          />
        </div>
        <div class="col-md-6">
          <button
            v-on:click="addAttribute(attrName)"
            class="btn btn-outline-success"
          >
            + Add
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
import { ProductValidation } from "../assets/js/ProductValidation";

export default {
  name: "add-form",
  props: ["url", "objectType", "fieldsObj"],
  data() {
    return {
      formData: {},
      errors: [],
      attrName: "",
      isSaving: false,
      added: false,
      currentImageFileName: "",
      images: [],
      isFormValid: undefined
    };
  },
  methods: {
    submit: async function() {
      // if (this.isFormValid === undefined) {
      //   this.errors.push("You have not entered any information yet.")
      //   return;
      // }
      if (!this.validateFormData()) {
        return;
      }

      this.formData.images = this.images;

      let res = await fetch("/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.formData)
      });

      if (res.ok) {
        this.added = true;
        this.errors = [];
        await this.initialiseFormData();
      } else {
        this.errors.push(
          "There was a problem: (" + res.status + ") " + res.statusText
        );
        this.added = false;
      }
    },
    addAttribute: function(attr) {
      let re = /[A-Z+,a-z+]/;
      if (re.test(attr)) {
        this.$set(this.formData.attributes, attr, "");
        this.attrName = "";
      }
    },
    deleteAttribute: function(attr) {
      delete this.formData.attributes[attr];
      this.$forceUpdate();
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
    uploadImageFile: async function(fieldName, event) {
      event.preventDefault();
      console.log(event);
      if (!event.target.files[0]) return;
      this.isSaving = true;
      let fd = new FormData();
      fd.append("image", event.target.files[0]);
      let res = await fetch("/file-upload/image", {
        method: "POST",
        body: fd
      });

      if (!res.ok) {
        this.errors.push(
          "There was a problem: (" + res.status + ") " + res.statusText
        );
      } else {
        this.images.push(await res.json());
      }
      this.isSaving = false;
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
