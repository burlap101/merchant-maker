<template>
  <div v-if="errors.length > 0" class="alert alert-danger" role="alert">
    <div class="h5">Errors</div>
    <ol class="">
      <li
        v-for="(error, index) in errors"
        class=""
        v-bind:key="'error-' + index"
      >
        {{ error }}
      </li>
    </ol>
  </div>
</template>

<script>
export default {};
</script>
