const baseUrl = window.location.hostname.includes('yambagraftonfirstaid.com.au') ? "/store/shopping-cart" : "";
export default class ShoppingCartService {

  static async findMyCart() {
    let url = "/shopping-cart";
    let res = await fetch(url);
    if (res.ok) {
      return res.json(); 
    } else {
      let message = undefined;
      try {
        message = (await res.json()).message;
      } catch (err) {
        throw Error("There was a problem communicating with the server. Please try again later.");
      }
      throw Error(message + ' - Code: ' + res.status);
    }
  }

  static async assignUserToCart() {
    let url = "/shopping-cart/assign-user-to-cart";
    let res = await fetch(url, {
      method: "POST"
    });
    if (res.ok) {
      return res.json();
    } else {
      const message = (await res.json()).message;
      throw Error(message + ' - Code: ' + res.status);
    }
  }

  static async deleteOne(id) {
    let url = `/shopping-cart/delete/${id}`;
    let res = await fetch(url, {
      method: "DELETE"
    });
    if (res.ok) {
      return res.json();
    } else {
      let message = undefined;
      try {
        message = (await res.json()).message;
      } catch(err) {
        throw Error("There was a problem communicating with the server. Please try again later.");
      }
      throw Error(message + ' - Code: ' + res.status);
    }
  }

  static async addToCart(itemDetails) {
    let url = "/shopping-cart/add-to-cart"
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(itemDetails)
    });

    if (res.ok) {
      return res.json();
    } else {
      const message = (await res.json()).message;
      throw Error(message + ' - Code: ' + res.status);
    }
  }

  static async paymentIntentSecret() {
    let url = "/shopping-cart/secret";
    let res = await fetch(url);
    if (res.ok) {
      return res.json();
    } else {
      const message = (await res.json()).message;
      throw Error(message + ' - Code: ' + res.status);
    }
  }
}