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
  props: ["values", "id"],
  methods: {
    rowSelected: async function() {
      this.$router.push("/shipping/edit/" + this.id);
    }
  }
};
</script>

<style scoped>
td {
  cursor: pointer;
}
</style>
