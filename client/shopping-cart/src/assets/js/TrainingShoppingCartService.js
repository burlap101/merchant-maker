const url = '/api/shoppingcart/';

export const TrainingShoppingCartService = {

  getShoppingCart: async function() {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("TrainingShoppingCartService: Network response was not ok.");
    }
    return res.json();
  }
}