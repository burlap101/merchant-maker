const baseUrl = "/api/shoppingcart/";

const processResponse = async function(res) {
  if (!res.ok) {
    throw new Error(
      "TrainingShoppingCartService: Network response was not ok."
    );
  }
  return res.json();
};

export const TrainingShoppingCartService = {
  getShoppingCart: async function() {
    const url = baseUrl;
    const res = await fetch(url);
    return processResponse(res);
  },

  update: async function(item) {
    const url = baseUrl + "update/" + item.pk;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });
    return processResponse(res);
  },

  delete: async function(pk) {
    const url = baseUrl + "delete/" + pk;
    const res = await fetch(url, {
      method: "DELETE"
    });
    return processResponse(res);
  }
};
