module.exports = {
  outputDir: "../../server/dist/public/admin",
  indexPath: "../../views/admin.hbs",
  publicPath: "/admin",
  devServer: {
    proxy: "http://localhost:3000"
  }
};
