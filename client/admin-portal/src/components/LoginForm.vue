<template>
  <div class="text-center form-signin">
    <img
      class="mb-4"
      src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
      alt=""
      width="72"
      height="72"
    />
    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
    <div
      class="alert-danger"
      v-for="(error, index) in errors"
      v-bind:key="index"
    >
      {{ error.status }}: {{ error.statusText }}
    </div>
    <label for="inputUName" class="sr-only">Username</label>
    <input
      v-model="username"
      type="text"
      id="inputUName"
      class="form-control"
      placeholder="Username"
      required
      autofocus
    />
    <label for="inputPassword" class="sr-only">Password</label>
    <input
      v-model="password"
      type="password"
      id="inputPassword"
      class="form-control"
      placeholder="Password"
      required
    />
    <div class="checkbox mb-3">
      <input class="mr-2" type="checkbox" id="remember-me" />
      <label for="remember-me">
        Remember me
      </label>
    </div>
    <button class="btn btn-lg btn-primary btn-block" v-on:click="submit()">
      Sign in
    </button>
    <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
  </div>
</template>

<script>
const baseUrl = (window.location.hostname == "yambagraftonfirstaid.com.au") ? "/store" : "";
export default {
  name: "login-form",
  data() {
    return {
      username: "",
      password: "",
      rememberMe: false,
      errors: []
    };
  },
  methods: {
    submit: async function() {
      let res = await fetch(baseUrl + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      });

      if (res.ok) {
        sessionStorage.setItem("username", this.username);
        this.$router.push("/products");
      } else {
        let error = res;
        this.errors.push("login failed: " + error.body);
      }
    }
  }
};
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
