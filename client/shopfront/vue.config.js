module.exports = {
  outputDir: "../../server/dist/public/shopfront",
  indexPath: "../../views/shopfront.hbs",
  publicPath: "/store/shopfront",
  devServer: {
    proxy: {
      "/api/courses": {
        target: "http://localhost:8000"
      },
      "/api/categories": {
        target: "http://localhost:3000"
      },
      "/api/products": {
        target: "http://localhost:3000"
      },
      "/media": {
        target: "http://localhost:3000"
      },
      "/file-upload": {
        target: "http://localhost:3000"
      },
      "/api/shopping-cart": {
        target: "http://localhost:3000"
      },
      "/api/customers": {
        target: "http://localhost:3000"
      },
      "/api/orders": {
        target: "http://localhost:3000"
      }
    }
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Online Store | Yamba Grafton First Aid";
      return args;
    });
  }
};
