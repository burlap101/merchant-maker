<template>
  <div class="table-responsive mytable">
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
          v-bind:id="ids[index]"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import { ProductFields } from "../../assets/js/ProductFields";
import TableRow from "./TableRow.vue";

const baseUrl = window.location.hostname.includes("yambagraftonfirstaid.com.au")
  ? "/store"
  : "";

export default {
  name: "my-table",
  components: {
    TableRow
  },
  data() {
    return {
      headers: [],
      entries: [],
      ids: [],
      errors: []
    };
  },
  async created() {
    let cols = ["#"];
    let names = [];
    for (let header in ProductFields.text) {
      cols.push(ProductFields.text[header].label);
      names.push(header);
    }
    for (let header in ProductFields.number) {
      cols.push(ProductFields.number[header].label);
      names.push(header);
    }
    this.headers = cols;

    let response = await fetch(baseUrl + "/products");

    let productsObj = {};

    if (response.ok) {
      productsObj = await response.json();
      // console.log(productsObj);
    } else {
      this.errors.push("There was a problem retrieving product data.");
    }
    let i = 0;
    for (let product in productsObj) {
      // console.log(productsObj[product])
      i++;
      let renderedRow = [i];
      this.ids.push(productsObj[product]._id);

      for (let name of names) {
        renderedRow.push(productsObj[product][name]);
      }
      this.entries.push(renderedRow);
    }
  }
};
</script>

<style scoped>
.mytable {
  font-size: smaller;
}
</style>
