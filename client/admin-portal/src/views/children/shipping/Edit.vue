<template>
  <div class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"
    >
      <div class="h3">
        <router-link to="/shipping">
          Shipping Methods
        </router-link>
        > Review
      </div>
    </div>
    <edit-form v-bind:id="$route.params.id"></edit-form>
  </div>
</template>

<script>
import EditForm from "@/components/shipping/EditForm.vue";

export default {
  name: "shipping-edit",
  components: {
    EditForm
  }
};
</script>
