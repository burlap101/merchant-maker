<template>
  <div class="container col-lg-3">
    <!-- For larger screens -->
    <div class="p-2 d-none d-lg-block">
      <div class="d-flex justify-content-between">
        <h4 class="h5 ml-2">Categories</h4>
        <button
          class="btn btn-info btn-sm mb-2"
          v-on:click="resetCategoryTree()"
        >
          Reset
        </button>
      </div>
      <ul class="list-group mb-3 p-0">
        <top-category
          v-for="(cat, index) in topLevelCategories"
          v-bind:key="index"
          v-bind:category="cat"
        />
      </ul>
    </div>

    <!-- For smaller screens -->
    <div class="bg-light px-2 pt-2 d-lg-none border">
      <div
        class="d-flex justify-content-between categories-nav"
        v-on:click="expanded = !expanded"
      >
        <h4 class="h5 ml-2">Categories</h4>
        <span><i class="fas fa-bars"></i></span>
      </div>
      <div v-if="expanded">
        <button class="btn btn-info mb-2" v-on:click="resetCategoryTree()">
          Reset
        </button>
        <ul class="list-group mb-3 p-0">
          <mobile-top-category
            v-for="(cat, index) in topLevelCategories"
            v-bind:key="index"
            v-bind:category="cat"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TopCategory from "./TopCategory.vue";
import MobileTopCategory from "./mobile/TopCategory";
import { mapState } from "vuex";

export default {
  name: "categories-bar",
  components: {
    TopCategory,
    MobileTopCategory
  },

  data() {
    return {
      expanded: false
    };
  },

  computed: {
    ...mapState({
      categories: state => state.categories,
      topLevelCategories: state => state.topLevelCategories,
      categoryTree: state => state.categoryTree
    })
  },

  watch: {
    categoryTree: function() {
      this.expanded = false;
    }
  },

  methods: {
    resetCategoryTree: async function() {
      this.$store.commit("resetTree");
      this.$store.dispatch("populateProducts");
    }
  }
};
</script>

<style scoped>
.categories-nav:hover {
  cursor: pointer;
}
</style>
