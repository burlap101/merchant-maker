<template>
  <div class="container col-lg-3">
    <div class="p-2 d-none d-lg-block">
      <h4 class="muted h5 ml-2">Categories</h4>
      <ul class="list-group mb-3 p-0">
        <top-category 
          v-for="(cat, index) in topLevelCategories"
          v-bind:key="index"
          v-bind:category="cat"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import TopCategory from "./TopCategory.vue";
import { mapState } from 'vuex';

export default {
  name: 'categories-bar',
  components: {
    TopCategory
  },

  computed: {
    ...mapState({
      categories: state => state.categories,
      topLevelCategories: state => state.topLevelCategories
    })
  }
}
</script>

