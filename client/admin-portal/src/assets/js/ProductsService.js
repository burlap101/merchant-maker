export class ProductsService {
  static addProduct(productDetails) {
    let url = "/products/add";
    return new Promise(async function() {
      try {
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(productDetails)
        });
      } catch (err) {
        console.log(err);
      }
    });
  }
  
  static findAll() {
    let url = "/products";
    return new Promise(async function() {
      try {
        await fetch(url);
      } catch (err) {
        throw err("An error occurred attempting to retrieve the full list of products.");
      }
    });
  }

  static findOne(id) {
    try {
      let url = "/products/" + id;
      return new Promise(async function() {
        await fetch(url);
      })
    } catch (err) {
      throw err("There was a problem retrieving the product.")
    }
  }

  static update(id, productDetails) {
    try {
      let url = `/products/${id}`;
      return new Promise(async function() {
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(productDetails)
        });
      })
    } catch (err) {
      throw err("There was a problem attempting to update the product.");
    }
  }

  static deleteOne(id) {
    try {
      let url = `/products/${id}`;
      return new Promise(async function() {
        await fetch(url, {
          method: "DELETE"
        });
      })
    } catch (err) {
      throw err("There was a problem attempting to delete the product.");
    }
  }
}
