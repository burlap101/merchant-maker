<template>
  <div class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"
    >
      <h2 class="h3">
        <router-link to="/products">
          Products
        </router-link>
        > Edit
      </h2>
    </div>
    <edit-form v-bind:id="$route.params.id" />
  </div>
</template>

<script>
import EditForm from "@/components/products/EditForm.vue";

export default {
  name: "products-edit",
  components: {
    EditForm
  }
};
</script>
