<template>
  <div>
    <div v-if="errors.length > 0" class="alert alert-danger" role="alert">
      <div class="h5">Errors</div>
      <ol class="">
        <li
          v-for="(error, index) in errors"
          class=""
          v-bind:key="'error-' + index"
        >
          {{ error }}
        </li>
      </ol>
    </div>
    <button class="btn btn-sm btn-warning text-light" v-on:click="initialise()">
      Reset Categories
    </button>
    <div
      class="row"
      v-for="(categories, lvl) in categoriesArray"
      v-bind:key="lvl"
    >
      <div class="col-md-6">
        <label for="category-select" class="mt-2"
          >Category Level {{ lvl + 1 }}</label
        >
        <select
          class="form-control"
          id="category-select"
          v-model="categorySelected[lvl]"
          v-on:change="categorySelect(lvl)"
          v-bind:disabled="categorySelected[lvl] >= 0"
        >
          <option
            v-for="(category, index) in categories"
            v-bind:key="index"
            v-bind:value="index"
          >
            {{ category.name }}
          </option>
          <option value="-1">Create new category...</option>
        </select>
        <div v-if="categorySelected[lvl] == -1">
          <label v-bind:for="'new-category-name-' + lvl" class="mt-2"
            >Name</label
          >
          <input
            v-bind:id="'new-category-name-' + lvl"
            type="text"
            class="form-control"
            v-model="newCategory.name"
            placeholder="Enter name for new category..."
          />
          <label v-bind:for="'new-category-description' + lvl" class="mt-2">
            Description
          </label>
          <textarea
            v-bind:name="'new-category-description' + lvl"
            v-bind:id="'new-category-description' + lvl"
            v-model="newCategory.description"
            cols="30"
            rows="3"
            class="form-control"
            placeholder="Enter description for new category..."
          ></textarea>
          <button
            class="btn btn-sm btn-outline-success mt-1"
            v-on:click="createNew(lvl)"
          >
            Confirm New Category
          </button>
        </div>
      </div>
    </div>
    <button
      class="btn btn-outline-success my-2"
      v-if="hasNewCategory"
      v-on:click="addAdditional"
    >
      + Additional Category
    </button>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "category-selection",
  data() {
    return {
      errors: [],
      hasNewCategory: false,
      newCategorySelected: false,
      categoriesArray: [],
      categorySelected: {},
      newCategory: {
        name: "",
        description: ""
      }
    };
  },
  methods: {
    initialise: async function() {
      this.categoriesArray = [];
      this.categorySelected = {};
      this.hasNewCategory = false;
      let res = await fetch("/categories?parent=noparent");
      if (!res.ok) {
        this.errors.push(
          "There was an error collecting the list of categories."
        );
      } else {
        this.categoriesArray.push(await res.json());
      }
    },
    categorySelect: async function(lvl) {
      this.errors = [];
      const categoryIndex = parseInt(this.categorySelected[lvl]);
      let res = await fetch(
        "/categories?parent=" + this.categoriesArray[lvl][categoryIndex]._id
      );
      if (!res.ok && res.status != 304) {
        console.log(res.status);
        this.errors.push(
          "There was a problem retrieving the next level of categories."
        );
      } else {
        let nextCategories = await res.json();
        this.categoriesArray.push(nextCategories);
        this.$emit("category-object", this.objectifyCategories());
      }
    },
    createNew: async function(lvl) {
      let re = /[A-Za-z]/;
      if (
        re.test(this.newCategory.name) &&
        re.test(this.newCategory.description)
      ) {
        this.categoriesArray[lvl].push(_.cloneDeep(this.newCategory));
        this.$set(
          this.categorySelected,
          lvl,
          this.categoriesArray[lvl].length - 1
        );
        this.newCategory.name = "";
        this.newCategory.description = "";
        this.hasNewCategory = true;
        this.$emit("category-object", this.objectifyCategories());
      } else {
        this.errors.push("There was an issue creating the new category");
      }
    },
    addAdditional: async function() {
      this.categoriesArray.push([]);
      this.$set(this.categorySelected, this.categoriesArray.length, -1);
      this.hasNewCategory = false;
    },
    objectifyCategories: function() {
      let tempCategories = undefined;
      let tempCategory = {};

      for (let i = Object.keys(this.categorySelected).length - 1; i >= 0; i--) {
        if (this.categorySelected[i] == -1) {
          this.errors.push(
            "You need to provide details on your new category and click 'Create New Category'"
          );
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }
        if (tempCategories === undefined) {
          tempCategories = {
            name: this.categoriesArray[i][this.categorySelected[i]].name,
            description: this.categoriesArray[i][this.categorySelected[i]]
              .description,
            parent: {}
          };
          tempCategory = tempCategories.parent;
        } else {
          tempCategory.name = this.categoriesArray[i][
            this.categorySelected[i]
          ].name;
          tempCategory.description = this.categoriesArray[i][
            this.categorySelected[i]
          ].description;
          tempCategory.parent = {};

          tempCategory = tempCategory.parent;
        }
      }
      console.log(tempCategories);
      return tempCategories;
    }
  },
  async created() {
    this.categoriesArray = [];
    this.categorySelected = {};
    let res = await fetch("/categories?parent=noparent");
    if (!res.ok) {
      this.errors.push("There was an error collecting the list of categories.");
    } else {
      this.categoriesArray.push(await res.json());
    }
  }
};
</script>
