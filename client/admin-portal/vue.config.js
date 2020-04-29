module.exports = {
  outputDir: "../../server/dist/public/portal",
  indexPath: "../../views/portal/index.html",
  publicPath: "/portal",
  devServer: {
    proxy: "http://localhost:3000"
  }
};
