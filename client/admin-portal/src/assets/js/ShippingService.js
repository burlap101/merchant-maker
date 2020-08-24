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

  findOne: async function(id) {
    let url = baseUrl + "/" + id;
    let res = await fetch(url);

    return processResponse(res);
  },

  deleteOne: async function(id) {
    let url = baseUrl + "/delete/" + id;
    let res = await fetch(url);

    return processResponse(res);
  },

  update: async function(id, shippingMethodDetails) {
    let url = baseUrl + "/update/" + id;
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(shippingMethodDetails)
    })

    return processResponse(res);
  }
};
