<template>
  <div>
    <h4 class="mb-3">Core Details</h4>
    <div v-if="added" class="alert alert-success" role="alert">
      Record added successfully
    </div>
    <div v-if="errors.length > 0" class="alert alert-danger" role="alert">
      <ul class="listgroup">
        <li v-for="(error, index) of errors" 
        class="list-group-item"
        v-bind:key="'error-' + index"
        >
          {{ error }}
        </li>
      </ul>
      
    </div>
    <div class="needs-validation">
      <div v-for="(field, index) of fieldsObj.text" class="row" v-bind:key="'text-field-' + index">
        <div class="col-md-6 mb-3">
          <label v-bind:for="field.id">{{ field.label }}</label>
          <input
            type="text"
            class="form-control"
            v-bind:id="field.id"
            v-bind:placeholder="field.hint"
            v-model="field.value"
            v-on:keyup="textFieldValidation(field)"
            required
          />
        </div>
      </div>
      <div v-for="(field, index) of fieldsObj.number" class="row" v-bind:key="'number-field-' + index">
        <div class="col-md-6 mb-3">
          <label v-bind:for="field.id">{{ field.label }}</label>
          <input
            type="number"
            class="form-control"
            v-bind:id="field.id"
            v-bind:placeholder="field.hint"
            v-model="field.value"
            required
          />
        </div>
      </div>
      <!-- <div class="row">
        <div class="col-md-6 mb-3">
          <label for="available">Available</label>
          <input
            type="number"
            class="form-control"
            id="available"
            v-bind:placeholder="
              'The number of ' + objectType + '\'s currently in stock'
            "
            v-model="formData.available"
            required
          />
        </div>
      </div> -->

      <h3 class="h4 my-3">Additional Attributes</h3>
      <div
        class="row"
        v-for="(attr, index) of Object.keys(formData.attributes)"
        v-bind:key="index"
      >
        <div class="col-md-6 mb-3">
          <label v-bind:for="attr">{{ attr }}</label>
          <input
            type="text"
            class="form-control"
            v-bind:id="attr"
            v-bind:placeholder="
              'The ' + attr.toLowerCase() + ' of the ' + objectType
            "
            v-model="formData.attributes[attr]"
            required
          />
        </div>
        <button v-on:click="deleteAttribute(attr)" class="btn btn-outline-danger col-md-6">
          - Remove
        </button>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <input
            type="text"
            class="form-control"
            id="attribute-name"
            v-bind:placeholder="'e.g. Size, Colour'"
            v-model="attrName"
            required
          />
        </div>
        <div class="col-md-6">
          <button v-on:click="addAttribute(attrName)" class="btn btn-outline-success">
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
export default {
  name: "add-form",
  props: ["url", "objectType", "fieldsObj"],
  data() {
    return {
      formData: {
        name: "",
        description: "",
        price: undefined,
        uom: "",
        stockCode: "",
        available: undefined,
        attributes: {}
      },
      attrName: "",
      added: false,
      errors: []
    };
  },
  methods: {
    submit: async function() {
      let res = await fetch("/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.formData)
      });

      if (res.ok) {
        this.added = true;
        this.error = "";
        this.formData = {
          name: "",
          description: "",
          price: undefined,
          uom: "",
          stockCode: "",
          available: undefined,
          attributes: {}
        };
      } else {
        this.errors.push(
          "There was a problem: (" + res.status + ") " + res.statusText
        );
        this.added = false;
      }
    },
    addAttribute: function(attr) {
      let re = /[A-Z+,a-z+]/;
      console.log("Attribute valid?: " + re.test(attr))
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
      if(fieldObj.re.test(fieldObj.value)) {
        fieldObj.isValid = true;
      } else {
        fieldObj.isValid = false;
      }
    }
  }
};
</script>
