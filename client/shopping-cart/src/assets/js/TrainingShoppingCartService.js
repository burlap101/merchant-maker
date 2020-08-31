const url = "/api/shoppingcart/";

const processRequest = async function(req) {
  if (!res.ok) {
    throw new Error(
      "TrainingShoppingCartService: Network response was not ok."
    );
  }
  return res.json();
}

export const TrainingShoppingCartService = {
  getShoppingCart: async function() {
    const res = await fetch(url);
    return processRequest(req);
  },

  update: async function(item) {
    const url = baseUrl + "update/" + item.pk;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    });
    return processRequest(req);
  },

  delete: async function(pk) {
    const url = baseUrl + "delete/" + pk;
    const res = await fetch(url, {
      method: 'DELETE'
    });
    return processRequest(req);
  }
};
