<template>
  <div>
    <h4 class="mb-3">Details</h4>
    <form class="needs-validation" novalidate>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="name">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-bind:placeholder="'The ' + objectType + '\'s name'"
            v-model="name"
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
            v-model="description"
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
            v-model="price"
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
            value=""
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
            value=""
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
            value=""
            required
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "add-form",
  props: ["url", "objectType"],
  methods: {}
};
</script>
