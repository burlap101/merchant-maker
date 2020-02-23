<template>
  <div class="table-responsive">
    <table class="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th v-for="(title, index) in headers" v-bind:key="'header-' + index">
            {{ title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <table-row
          v-for="(entry, index) in entries"
          v-bind:key="index"
          v-bind:values="Object.values(entry)"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import { ProductFields } from "../assets/js/ProductFields";
import TableRow from "../components/TableRow.vue";

export default {
  name: "my-table",
  props: ["apiUrl"],
  components: {
    TableRow
  },
  data() {
    return {
      headers: [],
      entries: [],
      errors: []
    };
  },
  async created() {
    let cols = ["_id"];
    let names = ["_id"];
    for (let header in ProductFields.text) {
      cols.push(ProductFields.text[header].label);
      names.push(header)
    }
    for (let header in ProductFields.number) {
      cols.push(ProductFields.number[header].label);
      names.push(header)
    }
    this.headers = cols;

    let response = await fetch("/products");

    let productsObj = {};

    if (response.ok) {
      productsObj = await response.json();
      // console.log(productsObj);
    } else {
      this.errors.push("There was a problem retrieving product data.");
    }
    for (let product in productsObj) {
      // console.log(productsObj[product])
      let renderedRow = [];
      for (let name of names) {
        console.log(name)
        renderedRow.push(productsObj[product][name]);
        console.log(renderedRow);
      }
      this.entries.push(renderedRow);
    }

    console.log(names);
  }
};
</script>
