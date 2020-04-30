<template>
  <div>
    <h4 class="my-3">
      Images
    </h4>
    <div
      v-for="(image, index) in images"
      v-bind:key="'image-upload-' + index"
      class="row"
    >
      <div class="col-md-6 mb-3">
        <input
          type="text"
          class="form-control"
          v-bind:id="'product-image-' + index"
          v-bind:name="'images-upload-' + index"
          disabled
          v-bind:value="image.originalname"
        />
      </div>
    </div>
    <div class="row container">
      <div class="col-md-6 my-pointer">
        <input
          type="file"
          class="custom-file-input"
          id="product-image"
          name="file"
          v-bind:disabled="isSaving"
          v-on:change="uploadImageFile('image-' + images.length, $event)"
          accept="image/*"
        />
        <label
          v-if="currentImageFileName === ''"
          for="product-image"
          class="custom-file-label text-muted"
        >
          Choose image
        </label>
        <label v-else for="product-image" class="custom-file-label text-muted">
          {{ currentImageFileName }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
const baseUrl = window.location.hostname.includes("yambagraftonfirstaid.com.au")
  ? "/store"
  : "";
export default {
  name: "image-upload",
  props: ["images"],
  data() {
    return {
      isSaving: false,
      currentImageFileName: ""
    };
  },
  methods: {
    uploadImageFile: async function(fieldName, event) {
      event.preventDefault();
      if (!event.target.files[0]) return;
      this.isSaving = true;
      let fd = new FormData();
      fd.append("image", event.target.files[0]);
      let res = await fetch(baseUrl + "/file-upload/image", {
        method: "POST",
        body: fd
      });

      if (!res.ok) {
        this.errors.push(
          "There was a problem: (" + res.status + ") " + res.statusText
        );
      } else {
        let imageObj = await res.json();
        this.images.push(imageObj);
        this.$emit("image-uploaded", imageObj);
      }
      this.isSaving = false;
    }
  }
};
</script>
