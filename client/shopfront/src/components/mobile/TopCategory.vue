<template>
  <li class="list-group-item my-list-item-primary p-0">
    <div
      class="d-flex justify-content-between align-items-center p-2"
      v-bind:class="{
        'my-list-item-primary-selected': selected,
        'my-list-item-primary': !selected
      }"
      v-on:click="categorySelected()"
    >
      <div>{{ category.name }}</div>
    </div>

    <div class="bg-light text-dark p-0">
      <child-category
        v-bind:category="childCat"
        v-bind:parent="category"
        v-bind:level="1"
        v-for="(childCat, index) in category.children"
        v-bind:key="index"
      />
    </div>
  </li>
</template>

<script>
import ChildCategory from "./ChildCategory.vue";
export default {
  name: "mobile-top-category",
  props: ["category"],
  components: {
    ChildCategory
  },

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
