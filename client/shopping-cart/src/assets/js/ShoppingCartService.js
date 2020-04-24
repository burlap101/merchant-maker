export class ShoppingCartService {

  async static findMyCart() {
    try {
      let url = "/shopping-cart";
      let res = await fetch(url);
      if (res.ok) {
        return res.json(); 
      } else {
        throw
      }
      
    } catch (err) {
      throw err("there was a problem retrieving your cart.");
    }
  }

  async static assignUserToCart() {
    try {
      let url = "/shopping-cart/assign-user-to-cart";
      return new Promise(async function() {
        await fetch(url, {
          method: "POST"
        })
      });
    } catch (err) {
      throw err("There was a problem assigning your username to a cart.");
    }
  }

  async static deleteOne(id) {
    try {
      let url = `/shopping-cart/delete/${id}`;
      return new Promise(async function() {
        await fetch(url, {
          method: "DELETE"
        })
      })
    } catch (err) {
      throw err("There was a problem attempting to delete this cart.");
    }
  }

  async static addToCart(itemDetails) {
    try {
      let url = "/shopping-cart/add-to-cart"
      return new Promise(async function() {
        await fetch(url, )
      })
    }
  }

}