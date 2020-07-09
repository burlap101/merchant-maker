<template>
  <tr>
    <td
      v-for="(value, index) in values"
      v-bind:key="index"
      v-on:click="rowSelected"
    >
      {{ value }}
    </td>
  </tr>
</template>

<script>
export default {
  name: "table-row",
  props: ["values"],
  methods: {
    rowSelected: async function() {
      this.$router.push("/orders/edit/" + this.values[0]);
    }
  }
};
</script>

<style scoped>
td {
  cursor: pointer;
}
</style>
