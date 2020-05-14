const baseUrl = window.location.hostname.includes("yambagraftonfirstaid.com.au")
  ? "/store/api/customers"
  : "/api/customers";

export const CustomersService = {
  createAndAssignIntent: async function(coreDetails, shippingAddress, billingAddress, paymentIntentId) {
    let url = baseUrl + "/create-assign-intent";
    let customer = {
      "coreDetails": coreDetails,
      "shippingAddress": shippingAddress,
      "billingAddress": billingAddress
    };
    let createAndAssignObj = {
      "customer": customer,
      "paymentIntentId": paymentIntentId
    };
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(createAndAssignObj)
    })

    if (res.ok) {
      return res.json();
    } else {
      let message = undefined;
      try {
        message = (await res.json()).message;
      } catch(err) {
        throw Error(
          "There was a problem communicating with the server. Please try again later."
        );
      }
      throw Error(message + " - Code: " + res.status);
    }
  }
}