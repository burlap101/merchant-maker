<template>
  <div class="ml-3">
    <div
      class="d-flex justify-content-between align-items-center my-list-group-info p-2"
      v-on:click="expanded=!expanded"
    >
      <span class="my-list-item-info">{{ category.name }}</span>
      <span v-if="category.children !== undefined && category.children.length > 0">
        <strong>
          <span v-if="expanded">
            <i class="fas fa-angle-double-down"></i>
          </span>
          <span v-else>
            <i class="fas fa-angle-double-right"></i>
          </span>
        </strong>
      </span>
    </div>
    <div v-if="expanded">
      <child-category
        v-bind:category="childCat"
        v-bind:parent="category"
        v-for="(childCat, index) in category.children"
        v-bind:key="index"
        v-bind:level="level + 1"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "child-category",
  props: ["category", "parent", "level"],
  data() {
    return {
      expanded: true
    };
  },

  computed: {
    selected: function() {
      if (this.$store.categoryTree.includes(this.category._id)) {
        return true;
      } else {
        return false;
      }
    }
  },

  methods: {
    categorySelected() {
      this.$store.dispatch("updateTreeAndProducts", this.category);
      this.expanded = true;
    }
  }
};
</script>

