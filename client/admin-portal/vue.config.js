module.exports = {
  outputDir: "../../server/dist/public/admin-portal",
  indexPath: "../../views/admin.hbs",
  publicPath: "/admin-portal",
  devServer: {
    proxy: "http://localhost:3000"
  }
};
