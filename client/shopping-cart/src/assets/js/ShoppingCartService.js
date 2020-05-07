const baseUrl = window.location.hostname.includes("yambagraftonfirstaid.com.au")
  ? "/store/api/shopping-cart"
  : "/api/shopping-cart";

export const ShoppingCartService = {
  findMyCart: async function() {
    let url = baseUrl;
    let res = await fetch(url);
    if (res.ok) {
      return res.json();
    } else {
      let message = undefined;
      try {
        message = (await res.json()).message;
      } catch (err) {
        throw Error(
          "There was a problem communicating with the server. Please try again later."
        );
      }
      throw Error(message + " - Code: " + res.status);
    }
  },

  assignUserToCart: async function() {
    let url = baseUrl + "/assign-user-to-cart";
    let res = await fetch(url, {
      method: "POST"
    });
    if (res.ok) {
      return res.json();
    } else {
      const message = (await res.json()).message;
      throw Error(message + " - Code: " + res.status);
    }
  },

  deleteOne: async function(id) {
    let url = baseUrl + `/delete/${id}`;
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
        throw Error(
          "There was a problem communicating with the server. Please try again later."
        );
      }
      throw Error(message + " - Code: " + res.status);
    }
  },

  addToCart: async function(itemDetails) {
    let url = baseUrl + "/add-to-cart";
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(itemDetails)
    });

    if (res.ok) {
      return res.json();
    } else {
      const message = (await res.json()).message;
      throw Error(message + " - Code: " + res.status);
    }
  },

  paymentIntentSecret: async function() {
    let url = baseUrl + "/secret";
    let res = await fetch(url);
    if (res.ok) {
      return res.json();
    } else {
      const message = (await res.json()).message;
      throw Error(message + " - Code: " + res.status);
    }
  },

  updateCartItem: async function(item) {
    let url = baseUrl + "/modify-cart-qty";
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });
    if (res.ok) {
      return res.json();
    } else {
      const message = (await res.json()).message;
      throw Error(message + " - Code: " + res.status);
    }
  }
};
