<template>
  <div>
    <h4 class="mb-3">Details</h4>
    <div v-if="added" class="alert alert-success" role="alert">
      Record added successfully
    </div>
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    <div class="needs-validation">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-bind:placeholder="'The ' + objectType + '\'s name'"
            v-model="formData.name"
            required
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="description">Description</label>
          <input
            type="text"
            class="form-control"
            id="description"
            v-bind:placeholder="'A short description of the ' + objectType"
            v-model="formData.description"
            required
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="price">Price</label>
          <input
            type="number"
            class="form-control"
            id="price"
            placeholder="The price per 'unit of measure' you are selling this product for"
            v-model="formData.price"
            required
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="uom">Unit of measure</label>
          <input
            type="text"
            class="form-control"
            id="uom"
            placeholder="E.g. 'each', 'm', 'box of 12'"
            v-model="formData.uom"
            required
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="stock-code">Stock Code (optional)</label>
          <input
            type="text"
            class="form-control"
            id="stock-code"
            placeholder="A code that you may want to designate your product"
            v-model="formData.stockCode"
          />
        </div>
      </div>
      <div class="row">
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
      </div>
      <h3 class="h4">Additional Attributes</h3>
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
        <button v-on:click="deleteAttribute(attr)" class="btn btn-outline-danger">
          - Remove
        </button>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <span>
            <input
              type="text"
              class="form-control"
              id="attribute-name"
              v-bind:placeholder="'e.g. Size, Colour'"
              v-model="attrName"
              required
            />
            <button v-on:click="addAttribute(attrName)" class="btn btn-outline-success">
              + Add
            </button>
          </span>
        </div>
      </div>
      <button v-on:click="submit" class="btn btn-primary">
        Add
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "add-form",
  props: ["url", "objectType"],
  data() {
    return {
      formData: {
        name: "",
        description: "",
        price: undefined,
        uom: "",
        stockCode: "",
        available: undefined,
        attributes: {},
      },
      attrName: "",
      added: false,
      error: ""
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
        this.error =
          "There was a problem: (" + res.status + ") " + res.statusText;
        this.added = false;
      }
    },
    addAttribute: function(attr) {
      this.$set(this.formData.attributes, attr, "");
      this.attrName = "";
    },
    deleteAttribute: function(attr) {
      delete this.formData.attributes[attr];
      this.$forceUpdate()
    }
  }
};
</script>
