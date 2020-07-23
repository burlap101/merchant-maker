<template>
  <div class="table-responsive mytable">
    <table class="table table-striped table-bordered table-hover">
      <my-table-header v-bind:headers="headers" />
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
import { ProductsService } from "../../assets/js/ProductsService";
import MyTableHeader from "../MyTableHeader.vue";
import TableRow from "./TableRow.vue";

export default {
  name: "my-table",
  components: {
    MyTableHeader,
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
    let productsObj = {};
    try {
      productsObj = await ProductsService.findAll();
      this.errors = [];
    } catch (err) {
      this.errors.push(err.message);
      return;
    }

    let i = 0;
    for (let product in productsObj) {
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
