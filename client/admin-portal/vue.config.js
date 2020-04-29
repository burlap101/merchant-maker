module.exports = {
  outputDir: "../../server/dist/public/portal",
  indexPath: "../../views/portal.hbs",
  publicPath: "/store/portal",
  devServer: {
    proxy: "http://localhost:3000"
  }
};
