module.exports = {
  outputDir: "../../server/dist/public/admin-portal",
  indexPath: "../../views/admin-portal.hbs",
  devServer: {
    proxy: "http://localhost:3000"
  }
};
