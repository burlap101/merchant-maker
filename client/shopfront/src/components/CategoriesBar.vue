<template>
  <div class="col-3">
    <h4 class="muted h5 ml-2">Categories</h4>
    <ul class="list-group mb-3 p-0">
      <li 
        class="list-group-item my-list-item-primary p-0"
        v-for="(cat, index) in topLevelCategories"
        v-bind:key="index"
      > 
        <div class="d-flex justify-content-between align-items-center my-list-item-primary p-2" v-on:click="cat.expanded=!cat.expanded">
          <div>{{ cat.name }}</div> <span v-if="cat.children !== undefined && cat.children.length > 0"><strong><span v-if="cat.expanded"><i class="fas fa-angle-double-down"></i></span><span v-else><i class="fas fa-angle-double-right"></i></span></strong></span>
        </div>
        
        <div class="my-list-item-info p-0" v-if="cat.expanded">
          <child-category 
            v-bind:category="childCat" 
            v-bind:parent="cat" 
            v-bind:level="1"
            v-for="(childCat, index) in cat.children" 
            v-bind:key="index" 
          />
        </div> 
      </li>
    </ul>
  </div>
</template>

<script>
import ChildCategory from "./ChildCategory.vue";
import { mapState } from 'vuex';

export default {
  name: 'categories-bar',
  components: {
    ChildCategory
  },

  computed: {
    ...mapState({
      categories: state => state.categories,
      topLevelCategories: state => state.topLevelCategories
    })
  }
}
</script>

