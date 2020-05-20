<template>
  <div>
    <div class="my-list-item-info p-2">
      {{ category.name }}
    </div>
    <div v-if="category.expanded">
      <child-category v-bind:category="childCat" v-for="(childCat, index) in category.children" v-bind:key="index" />
    </div> 
  </div>
</template>

<script>
export default {
  name: 'child-category',
  props: ['category']
}
</script>

