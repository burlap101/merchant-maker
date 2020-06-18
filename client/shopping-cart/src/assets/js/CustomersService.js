const baseUrl = window.location.hostname.includes("localhost:8")
  ? "/api/customers"
  : "/store/api/customers";

export const CustomersService = {
  create: async function(
    coreDetails,
    shippingAddress,
    billingAddress,
    contactable = false
  ) {
    let url = baseUrl + "/create";
    let customer = {
      coreDetails: coreDetails,
      shippingAddress: shippingAddress,
      billingAddress: billingAddress,
      contactable: contactable
    };
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
        throw Error(
          "There was a problem communicating with the server. Please try again later."
        );
      }
      throw Error(message + " - Code: " + res.status);
    }
  }
};
