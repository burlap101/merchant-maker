const baseUrl = window.location.host.includes("localhost:8")
  ? "/api/shopping-cart"
  : "/store/api/shopping-cart";

const processResponse = async function(res) {
  if (res.ok) {
    return res.json();
  } else {
    const message = (await res.json()).message;
    throw Error(message + " - Code: " + res.status);
  }
};

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

  addTsToCart: async function(itemDetails) {
    let url = baseUrl + "/add-ts-to-cart";
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(itemDetails)
    });
    return processResponse(res);
  },

  paymentIntentSecret: async function(val = undefined) {
    let url = baseUrl;
    if (val !== undefined) {
      url += "/secretbyval?val=" + val;
    } else {
      url += "/secret";
    }
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
  },

  updateCartTsItem: async function(item) {
    let url = baseUrl + "/modify-ts-cart-qty";
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });
    return processResponse(res);
  },

  removeItem: async function(item) {
    let url = baseUrl + "/remove-item";
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item.product)
    });

    if (res.ok) {
      return res.json();
    } else {
      const message = (await res.json()).message;
      throw Error(message + " - Code: " + res.status);
    }
  },

  removeTsItem: async function(item) {
    let url = baseUrl + "/remove-ts-item";
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });

    return processResponse(res);
  }
};
