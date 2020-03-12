<template>
  <div class="col-2">
    <ul class="list-group mb-3">
      <li class="list-group-item my-list-item">
        Category 1
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'categories-bar',
  data() {
    return {
      categories: []
    }
  },
  async created() {
    const res = await fetch("/categories")
  }
}
</script>
