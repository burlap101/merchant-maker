const baseUrl = window.location.host.includes("localhost:8")
  ? "/api/shipping"
  : "/store/api/shipping";

const processResponse = async function(res) {
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
};

export const ShippingService = {
  add: async function(shippingMethod) {
    let url = baseUrl + "/add";
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(shippingMethod)
    });

    return processResponse(res);
  },

  findAll: async function() {
    let url = baseUrl;
    let res = await fetch(url);

    return processResponse(res);
  },

  find: async function(id) {
    let url = baseUrl + "/" + id;
    let res = await fetch(url);

    return processResponse(res);
  },

  findAllTypes: async function() {
    let url = baseUrl + "/types";
    let res = await fetch(url);

    return processResponse(res);
  },

  findType: async function(id) {
    let url = baseUrl + "/types/" + id;
    let res = await fetch(url);

    return processResponse(res);
  },

  updateType: async function(newType) {
    let url = baseUrl + "/types/update";
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newType)
    });

    return processResponse(res);
  },

  deleteType: async function(id) {
    let url = baseUrl + "/types/" + id;
    let res = await fetch(url, {
      method: "DELETE"
    });

    return processResponse(res);
  }
};
