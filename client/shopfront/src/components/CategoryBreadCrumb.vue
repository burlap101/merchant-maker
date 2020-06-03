<template>
  <div>
    <span v-for="(cat, index) in categories" v-bind:key="index">{{ cat.name }} > </span> 
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'category-bread-crumb',
  
  computed: {
    ...mapState({
      categories: state => state.categoryTree
    })
  }
}
</script>