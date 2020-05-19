const baseUrl = window.location.hostname.includes("yambagraftonfirstaid.com.au")
  ? "/store/api/products"
  : "/api/products";

const noResponseMessage =
  "There was a problem communicating with the server. Please contact your administrator.";

export const ProductsService = {
  // eslint-disable-next-line prettier/prettier
  addProduct: async (productDetails) => {
    let url = baseUrl + "/add";
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productDetails)
    });
    if (res.ok) {
      return res.json();
    } else {
      let message = undefined;
      try {
        message = (await res.json()).message;
      } catch (err) {
        throw Error(noResponseMessage);
      }
      throw Error(message + " - Code: " + res.status);
    }
  },

  findAll: async function() {
    let url = baseUrl;
    let res = await fetch(url);
    if (res.ok) {
      return res.json();
    } else {
      let message = undefined;
      try {
        message = (await res.json()).message;
      } catch (err) {
        throw Error(noResponseMessage);
      }
      throw Error(message + " - Code: " + res.status);
    }
  },

  findOne: async function(id) {
    let url = baseUrl + "/" + id;
    let res = await fetch(url);
    if (res.ok) {
      return res.json();
    } else {
      let message = undefined;
      try {
        message = (await res.json()).message;
      } catch (err) {
        throw Error(
          "There was a problem communicating with the server. Contact your site's administrator."
        );
      }
      throw Error(message + " - Code: " + res.status);
    }
  },

  update: async function(id, productDetails) {
    let url = baseUrl + "/update/" + id;
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productDetails)
    });
    if (res.ok) {
      return res.json();
    } else {
      let message = undefined;
      try {
        message = (await res.json()).message;
      } catch (err) {
        throw Error(noResponseMessage);
      }
      throw Error(message + " - Code: " + res.status);
    }
  },

  deleteOne: async function(id) {
    let url = baseUrl + "/delete/" + id;
    let res = await fetch(url, {
      method: "DELETE"
    });
    if (res.ok) {
      return res.json();
    } else {
      let message = undefined;
      try {
        message = (await res.json()).message;
      } catch (err) {
        throw Error(noResponseMessage);
      }
      throw Error(message + " - Code: " + res.status);
    }
  }
};
