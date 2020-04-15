module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: "http://localhost:8000"
      },
      '/categories': {
        target: "http://localhost:3000"
      },
      '/products': {
        target: "http://localhost:3000"
      },
      '/media': {
        target: "http://localhost:3000"
      },
      '/file-upload': {
        target: "http://localhost:3000"
      },
      '/shopping-cart': {
        target: "http://localhost:3000"
      }
    }
  }
};
