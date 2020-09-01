<template>
  <thead>
    <tr>
      <th
        v-on:click="toggleSort(title)"
        v-for="(title, index) in headers"
        v-bind:key="'header-' + index"
      >
        {{ title }}
        <i
          v-if="title !== sortedBy.category"
          class="fa fa-sort"
          aria-hidden="true"
        ></i>
        <i
          v-if="title === sortedBy.category && sortedBy.asc"
          class="fa fa-sort-asc"
          aria-hidden="true"
        ></i>
        <i
          v-if="title === sortedBy.category && !sortedBy.asc"
          class="fa fa-sort-desc"
          aria-hidden="true"
        ></i>
      </th>
    </tr>
  </thead>
</template>

<script>
export default {
  name: "my-table-header",
  props: ["headers"],
  data() {
    return {
      sortedBy: {
        asc: true,
        category: ""
      }
    };
  },
  methods: {
    toggleSort: function(category) {
      if (category === this.sortedBy.category) {
        this.sortedBy.asc = !this.sortedBy.asc;
      } else {
        this.sortedBy.category = category;
        this.sortedBy.asc = true;
      }
    }
  }
};
</script>
