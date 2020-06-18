<template>
  <div class="ml-3">
    <div
      class="d-flex justify-content-between align-items-center p-2"
      v-bind:class="{ 'category-selected': selected }"
      v-on:click="categorySelected()"
    >
      <span class="">{{ category.name }}</span>
    </div>
    <div>
      <div v-for="(childCat, index) in category.children" v-bind:key="index">
        <child-category
          v-bind:category="childCat"
          v-bind:parent="category"
          v-bind:level="level + 1"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "child-category",
  props: ["category", "parent", "level"],

  computed: {
    selected: function() {
      if (
        this.$store.state.categoryTree.some(el => {
          return (
            el.name === this.category.name &&
            el.description === this.category.description
          );
        })
      ) {
        return true;
      } else {
        return false;
      }
    }
  },

  methods: {
    categorySelected() {
      this.$store.dispatch("updateTreeAndProducts", this.category);
    }
  }
};
</script>

<style scoped>
span:hover {
  color: #7a7a7a;
}
.category-selected {
  font-weight: 900;
}
</style>
