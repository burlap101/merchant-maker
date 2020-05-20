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
          <child-category v-bind:category="childCat" v-for="(childCat, index) in category.children" v-bind:key="index" />
        </div> 
      </li>
    </ul>
  </div>
</template>

<script>
import ChildCategory from "./ChildCategory.vue";

export default {
  name: 'categories-bar',
  components: {
    ChildCategory
  },
  data() {
    return {
      categories: [],
      errors: []
    }
  },
  computed: {
    topLevelCategories: function() {
      let topCats = [];
      for (let cat of this.categories) {
        this.$set(cat, 'expanded', false)
        if (!cat.hasParent) {
          topCats.push(cat);
        }
      }
      console.log(topCats);
      return topCats;
    }
  },
  async created() {
    const res = await fetch("api/categories");
    if (res.ok) {
      this.categories = await res.json();
    } else {
      this.errors.push("There was a problem retrieving categories." + res.status)
    }
  }
}
</script>

