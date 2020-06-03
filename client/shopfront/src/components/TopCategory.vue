<template>
  <li
    class="list-group-item my-list-item-primary p-0"
  >
    <div
      class="d-flex justify-content-between align-items-center p-2"
      v-bind:class="{ 'my-list-item-primary-selected': selected, 'my-list-item-primary': !selected }"
      v-on:click="categorySelected()"
    >
      <div>{{ category.name }}</div>
      <span v-if="category.children !== undefined && category.children.length > 0">
        <strong>
          <span v-if="category.expanded">
            <i class="fas fa-angle-double-down"></i>
          </span>
          <span v-else>
            <i class="fas fa-angle-double-right"></i>
          </span>
        </strong>
      </span>
    </div>

    <div class="my-list-item-info p-0" v-if="category.expanded">
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
  name: "top-category",
  props: ["category"],
  components: {
    ChildCategory
  },

  data() {
    return {
      expanded: true
    };
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
      this.expanded = !this.expanded;
    }
  }
};
</script>

