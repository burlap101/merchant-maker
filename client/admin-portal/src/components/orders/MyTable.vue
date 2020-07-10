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
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import { OrdersService } from "../../../../common-files/js/OrdersService";
import TableRow from "./TableRow.vue";

export default {
  name: "my-table",
  components: {
    TableRow
  },
  data() {
    return {
      headers: ["Order No.", "Name", "Value", "Status"],
      entries: [],
      errors: []
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
        let total = 0;
        if (order.cart.total !== undefined) {
          total += order.cart.total;
        }
        for (const ts of order.trainingSessions) {
          total += ts.total_cost;
        }
        let renderedRow = [order._id];
        renderedRow.push(order.customer.coreDetails.name);
        renderedRow.push(total.toFixed(2));
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

<style scoped>
.mytable {
  font-size: smaller;
}
</style>
