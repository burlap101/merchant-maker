<template>
  <div class="row">
    <div class="col-6">
      <h6 class="my-0">
        {{ item.product.stockCode }} - {{ item.product.name }}
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
    <div class="col-2 text-center">
      <h6>Qty</h6>
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          v-model="item.qty"
          min="1"
          v-bind:max="item.product.available"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button">-</button>
          <button class="btn btn-outline-secondary" type="button">+</button>
        </div>
      </div>
    </div>
    <div class="col-3 text-muted text-right align-bottom">
      ${{ (item.qty * item.product.price).toFixed(2) }}
    </div>
    <div class="col-1">
      <a class="text-secondary"><i class="far fa-trash-alt fa-lg"></i></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "product-cart-item"
  
};
</script>
