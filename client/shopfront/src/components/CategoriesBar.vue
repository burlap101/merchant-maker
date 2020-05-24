<template>
  <div class="col-2">
    <h4 class="muted h5 ml-2">Categories</h4>
    <ul class="list-group mb-3">
      <li 
        class="list-group-item my-list-item-primary p-0"
        v-for="(cat, index) in topLevelCategories"
        v-bind:key="index"
        v-on:click="cat.expanded=!cat.expanded"
      > 
        <div class="my-list-item-primary p-2">
          {{ cat.name }}
        </div>
        
        <div class="my-list-item-info p-2" v-if="cat.expanded">
          <child-category v-bind:category="childCat" v-bind:parent="cat" v-for="(childCat, index) in category.children" v-bind:key="index" />
        </div> 
      </li>
    </ul>
  </div>
</template>

<script>
import ChildCategory from "./ChildCategory.vue";
import { CategoriesService } from "../assets/js/CategoriesService";

export default {
  name: 'categories-bar',
  components: {
    ChildCategory
  },
  data() {
    return {
      categories: [],
      topLevelCategories: [],
      errors: []
    }
  },
  
  async created() {
    this.categories = await CategoriesService.findAll();
    let topCats = [];
    for (let cat of this.categories) {
      this.$set(cat, 'expanded', false)
      if (!cat.hasParent) {
        topCats.push(cat);
      }
    }
    this.topLevelCategories = topCats;
  }
}
</script>

