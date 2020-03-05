const url = "/api/shoppingcart/";

export class ShoppingCartService {
  static async getShoppingCart() {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return data.map(cartItems => ({
        ...cartItems
      }));
    } else {
      throw new Error("ShoppingCartService: Network response was not ok.");
    }
  }

  static async addToCart(data) {
    try {
      let currentCart = await this.getShoppingCart();
      let cookie = document.cookie.split(";").map(c => c.trim());
      let csrfToken = "";
      for (let c of cookie) {
        if (c.startsWith("csrftoken=")) {
          csrfToken = c.split("csrftoken=")[1];
          break;
        }
      }

      if (
        currentCart.some(
          i =>
            i.training_session === data.training_session &&
            i.course === data.course
        )
      ) {
        let cartItemToUpdate = currentCart.find(
          i =>
            i.training_session === data.training_session &&
            i.course === data.course
        );
        data.qty += cartItemToUpdate.qty;
        const response = await fetch(url + cartItemToUpdate.pk + "/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response;
      } else {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
          },
          redirect: "follow", // manual, *follow, error
          referrer: "no-referrer", // no-referrer, *client
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response;
      }
    } catch (err) {
      throw Error(err);
    }
  }
}
