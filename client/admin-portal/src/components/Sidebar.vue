<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/home">
            <div
              class="nav-link"
              v-on:click="activeOption = 'dashboard'"
              v-bind:class="{ active: activeOption == 'dashboard' }"
            >
              Dashboard
            </div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/products">
            <div
              v-bind:class="{ active: activeOption == 'products' }"
              class="nav-link"
              v-on:click="activeOption = 'products'"
            >
              Products
            </div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/orders">
            <div
              v-bind:class="{ active: activeOption == 'orders' }"
              class="nav-link"
              v-on:click="activeOption = 'orders'"
            >
              Orders
            </div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/shipping">
            <div
              v-bind:class="{ active: activeOption == 'shipping' }"
              class="nav-link"
              v-on:click="shipping"
            >
              Shipping
            </div>
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">
            <span data-feather="users"></span>
              Customers
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">
            <span data-feather="bar-chart-2"></span>
              Reports
          </a>
        </li>
      </ul>

      <!-- <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
        <span>Saved reports</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <a class="nav-link" href="#">
            <span data-feather="file-text"></span>
            Current month
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <span data-feather="file-text"></span>
            Last quarter
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <span data-feather="file-text"></span>
            Social engagement
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">
            <span data-feather="file-text"></span>
            Year-end sale
          </a>
        </li>
      </ul> -->
    </div>
  </nav>
</template>

<script>
export default {
  name: "sidebar",
  data() {
    return {
      activeOption: this.$route.name
    };
  },
  methods: {
    shipping: async function() {
      this.$store.dispatch("shipping/populateTypes");
      this.activeOption = "shipping";
    }
  }
};
</script>
