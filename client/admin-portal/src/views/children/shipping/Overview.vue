<template>
  <div class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom"
    >
      <h2 class="h2">Shipping Methods</h2>
      <div class="btn-toolbar mb-2 mb-md-0">
        <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
          <i class="fa fa-filter" aria-hidden="true"></i>
        </button>
        <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
          <span data-feather="calendar"></span>
          Other Actions
        </button>
      </div>
    </div>
    <my-table />
  </div>
</template>

<script>
import MyTable from "@/components/shipping/MyTable.vue";

export default {
  name: "shipping",
  components: {
    MyTable
  }
};
</script>
