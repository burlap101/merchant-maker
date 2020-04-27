<template>
  <div>
    <h4 class="d-flex justify-content-between align-items-center mb-3">
      <span class="text-muted">Your cart</span>
      <span class="badge badge-secondary badge-pill"
        >{{ products.length + trainingSessions.length }}
        <a href="/shopping-cart"><i class="fas fa-edit"></i></a
      ></span>
    </h4>
    <ul class="list-group mb-3">
      <li
        v-for="(item, index) in trainingSessions"
        v-bind:key="index"
        class="list-group-item d-flex justify-content-between lh-condensed"
      >
        <div>
          <h6 class="my-0">
            {{ item.course.course_code }} for {{ item.qty }} students
          </h6>
          <small class="text-muted"
            >{{ item.course.title }} at
            {{ item.training_session.location }},
            {{ item.training_session.session_date }}</small
          >
        </div>
        <span class="text-muted">${{ item.total_cost.toFixed(2) }}</span>
      </li>
      <li
        v-for="(item, index) in products"
        v-bind:key="index"
        class="list-group-item d-flex justify-content-between lh-condensed"
      >
        <div>
          <h6 class="my-0">
            {{ item.product.name }} -- {{ item.qty }} {{ item.product.uom }}
          </h6>
          <small class="text-muted">
            <span
              v-for="(attrName, attrIndex) in Object.keys(item.product.attributes)"
              v-bind:key="attrIndex"
            > 
              {{ attrName }}: {{ item.product.attributes[attrName] }}, 
            </span>
          </small>
        </div>
        <span class="text-muted">${{ (item.product.price * item.qty).toFixed(2) }}</span>
      <li class="list-group-item d-flex justify-content-between">
        <span>Total (AUD)</span>
        <strong>${{ grandTotal.toFixed(2) }}</strong>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "shopping-cart-preview",
  props: ["products", "trainingSesssions"],
  computed: {
    grandTotal: function() {
      let result = 0;
      for (let item of this.trainingSessions) {
        result += item.total_cost;
      }
      for (let item of this.products) {
        result += item.product.price * item.qty
      }
      return result;
    }
  },
}
</script>