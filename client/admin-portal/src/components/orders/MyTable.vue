<template>
  <div class="table-responsive mytable">
    <table class="table table-striped table-bordered table-hover">
      <my-table-header v-bind:headers="headers" />
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
import { OrdersService } from "../../../../common-files/js/OrdersService";
import TableRow from "./TableRow.vue";
import MyTableHeader from "../MyTableHeader.vue";

export default {
  name: "my-table",
  components: {
    TableRow,
    MyTableHeader
  },
  data() {
    return {
      headers: ["Order No.", "Name", "Value", "Status"],
      entries: [],
      errors: [],
      
    };
  },
  async created() {
    let orders = undefined;
    try {
      orders = await OrdersService.findAll();
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

    for (let order of orders) {
      try {
        let renderedRow = [order._id];
        renderedRow.push(order.customer.coreDetails.name);
        renderedRow.push(order.cart.total);
        renderedRow.push(order.status);
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
