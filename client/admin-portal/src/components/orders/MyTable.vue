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
import { OrdersService } from "../../../../common-files/js/OrdersService";
import TableRow from "./TableRow.vue";

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
    let orders = undefined;
    try {
      orders = await OrdersService.findAll();
      this.errors = [];
    } catch (err) {
      this.errors.push(err.message);
      return;
    }

    let cols = ["#"]; // this stores the header names to be displayed e.g. after title casing applied etc.
    let names = []; // this stores the header names as they're referred to originally i.e. no formatting applied.
    for (let order of orders) {
      for (let header in Object.keys(order)) {
        if (!names.includes(header)) {
          cols.push(header);
          names.push(header);
        }
      }
    }

    this.headers = cols;

    let i = 0;
    for (let order in orders) {
      i++;
      let renderedRow = [i];
      this.ids.push(orders[order]._id);

      for (let name of names) {
        renderedRow.push(orders[order][name]);
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
