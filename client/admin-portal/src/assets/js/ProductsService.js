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
}
