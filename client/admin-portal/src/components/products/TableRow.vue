<template>
  <tr>
    <td v-for="(value, index) in values" v-bind:key="index">
      {{ value }}
    </td>
  </tr>
</template>

<script>
export default {
  name: "table-row",
  props: ["values"]
};
</script>

<style scoped>
td {
  cursor: pointer;
}
</style>
