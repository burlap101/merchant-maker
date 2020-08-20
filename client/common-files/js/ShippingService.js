const baseUrl = window.location.host.includes("localhost:8")
  ? "/api/shipping"
  : "/store/api/shipping";

export const ShippingService = {
  add: async function(shippingMethod) {
    let url = baseUrl + "/add";
    let res = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: shippingMethod
    });

    if (res.ok) {
      return res.json();
    } else {
      let message = undefined;
      try {
        message = (await res.json()).message;
      } catch (err) {
        throw Error("There was a problem communicating with the server.");
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
        throw Error("There was a problem communicating with the server.");
      }
      throw Error(message + " - Code: " + res.status);
    }
  },

  find: async function(id) {
    let url = baseUrl + '/' + id;
    let res = await fetch(url);

    if (res.ok) {
      return res.json();
    } else {
      let message = undefined;
      try {
        message = (await res.json()).message;
      } catch (err) {
        throw Error("There was a problem communicating with the server.");
      }
      throw Error(message + " - Code: " + res.status);
    }
  }
}