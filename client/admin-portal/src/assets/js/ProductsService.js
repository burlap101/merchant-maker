const baseUrl = window.location.hostname.includes("yambagraftonfirstaid.com.au")
  ? "/store/products/api"
  : "";

const noResponseMessage = "There was a problem communicating with the server. Please contact your administrator.";

export default class ProductsService {
  static async addProduct(productDetails) {
    let url = baseUrl + "/add";
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productDetails)
    });
    if (res.ok) {
      return res.json();
    } else {
      let message = undefined;
      try {
        message = (await res.json()).message;
      } catch (err) {
        throw Error(noResponseMessage);
      }
      throw Error(message + ' - Code: ' + res.status);
    }
  }

  static async findAll() {
    let url = baseUrl;
    let res = await fetch(url);
    if (res.ok) {
      return res.json();
    } else {
      let message = undefined;
      try {
        message = (await res.json()).message;
      } catch (err) {
        throw Error(noResponseMessage);
      }
      throw Error(message + ' - Code: ' + res.status);
    }
  }

  static async findOne(id) {
    let url = baseUrl + "/" + id;
    let res = await fetch(url);
    if (res.ok) {
      return res.json();
    } else {
      let message = undefined;
      try {
        message = (await res.json()).message;
      } catch (err) {
        throw Error("There was a problem communicating with the server. Contact your site's administrator.")
      }
      throw Error(message + ' - Code: ' + res.status);
    }
  }

  static async update(id, productDetails) {
    let url = baseUrl + "/" + id;
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productDetails)  
    });
    if (res.ok) {
      return res.json();
    } else {
      let message = undefined;
      try {
        message = (await res.json()).message;
      } catch (err) {
        throw Error(noResponseMessage);
      }
      throw Error(message + ' - Code: ' + res.status);
    }
  }

  static async deleteOne(id) {
    let url = baseUrl + "/" + id;
    let res = await fetch(url, {
      method: "DELETE"
    });
    if (res.ok) {
      return res.json();
    } else {
      let message = undefined;
      try {
        message = (await res.json()).message;
      } catch (err) {
        throw Error(noResponseMessage);
      }
      throw Error(message + ' - Code: ' + res.status);
    }
  }
}
