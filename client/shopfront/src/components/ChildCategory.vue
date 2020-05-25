<template>
  <div class="ml-1">
    <div class="my-list-item-info p-2" v-on:click="expanded=!expanded">
      {{ category.name }} <span v-if="category.children !== undefined && category.children.length > 0"><span v-if="expanded">v</span><span v-else>></span></span>
    </div>
    <div v-if="expanded">
      <child-category v-bind:category="childCat" v-bind:parent="category" v-bind:ccindex="index" v-for="(childCat, index) in category.children" v-bind:key="index" />
    </div> 
  </div>
</template>

<script>
export default {
  name: 'child-category',
  props: ['category', 'parent', 'ccindex'],
  data() {
    return {
      expanded: false
    }
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
      this.$store.dispatch('updateTreeAndProducts', this.category);
      this.expanded = true;
    }
  }
}
</script>

