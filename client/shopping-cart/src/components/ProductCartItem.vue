<template>
  <div class="d-flex justify-content-between">
    <div class="">
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
    <div class="d-flex-column">
      <div class="">Qty</div>
      <div class="input-group">
        <input
          type="text"
          class="form-control col-3"
          v-bind:value="item.qty"
          v-on:change="$emit('value-change', $event.target.value)"
          min="1"
          v-bind:max="item.product.available"
        />
        <div class="input-group-append">
          <button
            v-on:click="$emit('decrement')"
            class="btn btn-outline-secondary"
            type="button"
          >
            -
          </button>
          <button
            v-on:click="$emit('increment')"
            class="btn btn-outline-secondary"
            type="button"
          >
            +
          </button>
        </div>
      </div>
    </div>
    <div>
      <div class="text-muted text-right align-bottom">
        <div class="col">
          ${{ (item.qty * item.product.price).toFixed(2)
          }}<a class="text-secondary ml-2" v-on:click="$emit('remove')"
            ><i class="far fa-trash-alt fa-lg"></i
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "product-cart-item",
  props: ["item"]
};
</script>
