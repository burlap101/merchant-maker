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

  find: async function(query) {
    let url = baseUrl + "?";
    for (const q in query) {
      url += `${q}=${query[q]}&`;
    }
    let res = await fetch(url.slice(0, -2));
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

  complete: async function(id) {
    let url = baseUrl + "/complete/" + id;
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
  }
};
