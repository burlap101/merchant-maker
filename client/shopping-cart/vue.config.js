module.exports = {
  devServer: {
    proxy: {
      "/api/courses": {
        target: "http://localhost:8000"
      },
      "/categories": {
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
      }
    }
  },
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args => {
      args[0].title = 'Cart & Checkout'
      return args
    })
  }
};
