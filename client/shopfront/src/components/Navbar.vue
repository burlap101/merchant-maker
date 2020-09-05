<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand mr-1 mb-1 mt-0" href="/">
        <img
          src="../assets/img/first-aid-kit.svg"
          class="align-items-center d-none d-md-inline"
          height="31,"
          width="31"
        />
        <span class="mx-2 align-middle d-none d-md-inline"
          >Yamba Grafton First Aid</span
        >
        <span class="ml-0 align-middle d-md-none"
          ><small>Yamba Grafton First Aid</small></span
        >
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavUpper"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavUpper">
        <ul class="navbar-nav ml-auto mr-3">
          <li class="nav-item mr-3">
            <a class="nav-link" href="mailto:info@yambagraftonfirstaid.com.au"
              ><i class="fas fa-envelope"></i>
              info@yambagraftonfirstaid.com.au<span class="sr-only"
                >(current)</span
              ></a
            >
          </li>
          <li class="nav-item mr-3">
            <a class="nav-link" href="tel:0400233688"
              ><i class="fas fa-phone"></i> 0400 233 688<span class="sr-only"
                >(current)</span
              ></a
            >
          </li>
        </ul>
      </div>
    </nav>
    <nav
      class="navbar navbar-expand-lg navbar-light bg-info fixed-top fixed-top-2 justify-content-between mb-dual-navbar"
      style="z-index: 999;"
    >
      <div class="navbar-brand d-lg-none">Menu</div>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-3">
          <li class="nav-item">
            <a class="nav-link text-primary" href="/courses/about_us/"
              >About us <span class="sr-only">(current)</span></a
            >
          </li>
          <li>
            <a class="nav-link text-primary" href="/courses/enquiry/"
              >Contact<span class="sr-only">(current)</span></a
            >
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle text-primary"
              id="dropdown01"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              >Our Courses</a
            >
            <div class="dropdown-menu bg-info" aria-labelledby="dropdown01">
              <a
                v-for="course in courses"
                v-bind:key="course.id"
                class="dropdown-item text-primary"
                v-bind:href="'/courses/' + course.url_friendly_title"
                >{{ course.course_code }} - {{ course.title }}</a
              >
            </div>
          </li>
          <li>
            <a class="nav-link text-primary" href="/store/shopfront/overview/"
              >Store<span class="sr-only">(current)</span></a
            >
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle text-primary"
              id="dropdown02"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              >First Aid Resources</a
            >
            <div class="dropdown-menu bg-info" aria-labelledby="dropdown02">
              <p class="dropdown-item">
                Yamba Grafton First Aid provides a range of free downloadable
                First Aid Charts. <br /><u
                  ><a
                    target="_blank"
                    href="https://allenstraining.com.au/first-aid-charts.aspx"
                    >View Our First Aid Charts</a
                  ></u
                >
              </p>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="/store/cart/checkout/">
              <span class="fa-layers">
                <i
                  class="fas fa-shopping-cart fa-2x"
                  data-fa-transform="shrink-2"
                ></i>
                <span id="cart-counter" class="badge badge-pill badge-danger">
                  {{ cartLength }}
                </span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { CourseService } from "../../../shopfront/src/assets/js/CourseService";
import { mapGetters } from "vuex";

export default {
  name: "Navbar",

  computed: {
    ...mapGetters("cart/", ["cartLength"])
  },

  data() {
    return {
      errors: [],
      courses: []
    };
  },

  async created() {
    try {
      this.courses = await CourseService.getCourses();
    } catch (err) {
      this.errors.push(err.message);
    }
  }
};
</script>

<style scoped>
.dropdown-menu {
  width: 300px;
  white-space: normal;
}
.dropdown-item {
  width: 100%;
  white-space: normal;
}
</style>
