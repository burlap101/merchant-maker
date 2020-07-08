const baseUrl = window.location.host.includes("localhost:8")
  ? "/api/orders"
  : "/store/api/orders";

export const OrdersService = {
  initialise: async function() {
    let url = baseUrl + "/initialise";
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

  open: async function(customer) {
    let url = baseUrl + "/open";
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer)
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

  deinitialise: async function() {
    let url = baseUrl + "/deinitialise";
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

  findAll: async function() {
    let url = baseUrl;
    let res = await fetch(url);

    if(res.ok) {
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
};
