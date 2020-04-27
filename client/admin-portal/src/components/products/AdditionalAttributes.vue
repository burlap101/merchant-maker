<template>
  <div class="col-md-6">
    <h3 class="h4 my-3">
      Additional Attributes
      <i
        class="h6 far fa-question-circle ml-2 text-muted"
        data-toggle="tooltip"
        data-placement="right"
        title="Any additional attributes that you would like to designate to distinguish this product from others that you may stock similar"
      >
      </i>
    </h3>
    <div
      class="d-flex justify-content-between align-items-end mb-3"
      v-for="(attr, index) in Object.keys(attributes)"
      v-bind:key="index"
    >
      <div>
        <div class="">{{ attr }}</div>
        <input
          type="text"
          class="form-control col"
          v-bind:id="attr"
          v-bind:placeholder="'The ' + attr.toLowerCase() + ' of the product'"
          v-model="attributes[attr]"
        />
      </div>
      <div class="">
        <button
          v-on:click="deleteAttribute(attr)"
          class="btn btn-outline-danger"
        >
          - Remove
        </button>
      </div>
    </div>
    <div class="d-flex justify-content-between align-items-end">
      <div class="">
        <div class="text-muted">(New Category Name)</div>
        <input
          type="text"
          class="form-control"
          id="attribute-name"
          v-bind:placeholder="'e.g. Size, Colour'"
          v-model="attrName"
        />
      </div>
      <div>
        <button
          v-on:click="addAttribute(attrName)"
          class="btn btn-outline-success"
        >
          + Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "additional-attributes",
  props: ["attributes"],
  data() {
    return {
      attrName: ""
    };
  },
  methods: {
    addAttribute: function(attr) {
      let re = /[A-Z+,a-z+]/;
      if (re.test(attr)) {
        this.$set(this.attributes, attr, "");
        this.attrName = "";
      }
    },
    deleteAttribute: function(attr) {
      delete this.formData.attributes[attr];
      this.$forceUpdate();
    }
  }
};
</script>
