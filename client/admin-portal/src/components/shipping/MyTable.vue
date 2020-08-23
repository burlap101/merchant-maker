<template>
  <div class="table-responsive mytable">
    <table class="table table-striped table-bordered table-hover">
      <my-table-header v-bind:headers="headers" />
      <tbody>
        <table-row
          v-for="(entry, index) in entries"
          v-bind:key="index"
          v-bind:values="Object.values(entry)"
          v-bind:id="shippingMethods[index]._id"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import { ShippingService } from "@/assets/js/ShippingService";
import TableRow from "./TableRow.vue";
import MyTableHeader from "../MyTableHeader.vue";
import { mapState } from "vuex";

export default {
  name: "my-table",
  components: {
    TableRow,
    MyTableHeader
  },
  data() {
    return {
      headers: ["#","Name", "Description", "Per Product", "Discounts", "Cost"],
      entries: [],
      errors: [],
      shippingMethods: []
    };
  },
  async created() {
    try {
      this.shippingMethods = await ShippingService.findAll();
      this.errors = [];
    } catch (err) {
      this.errors.push(err.message);
      return;
    }

    // let cols = ["#"]; // this stores the header names to be displayed e.g. after title casing applied etc.
    // let names = []; // this stores the header names as they're referred to originally i.e. no formatting applied.
    // for (let order of orders) {
    //   for (let header in Object.keys(order)) {
    //     if (!names.includes(header)) {
    //       cols.push(header);
    //       names.push(header);
    //     }
    //   }
    // }

    // this.headers = cols;

    for (const [index, method] of this.shippingMethods.entries()) {
      try {
        let renderedRow = [index+1];
        renderedRow.push(method.name);
        renderedRow.push(method.description);
        renderedRow.push(method.perProduct);
        renderedRow.push(method.discounts.length);
        renderedRow.push(method.cost);
        this.entries.push(renderedRow);
      } catch (err) {
        if (err.name !== "TypeError") {
          this.errors.push(err.name + ":", err.message);
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.mytable {
  font-size: smaller;
}
</style>
