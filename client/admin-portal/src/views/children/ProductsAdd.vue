<template>
  <div class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"
    >
      <h2 class="h3">
        <router-link to="/products">
          Products
        </router-link>
        > Add
      </h2>
    </div>
    <add-form v-bind:object-type="'product'" v-bind:fields-obj="formFields" />
  </div>
</template>

<script>
import AddForm from "../../components/AddForm.vue";
import { ProductFields } from "../../assets/js/ProductFields";
export default {
  name: "products-add",
  components: {
    AddForm
  },
  data() {
    return {
      formFields: ProductFields
    };
  }
};
</script>
