module.exports = (app) => {
  const information = require("../controllers/info.controller");

  var router = require("express").Router();

  // Update Information
  router.put("/:id", information.update);

  // Delete Information
  router.delete("/:id", information.delete);

  app.use("/api/information", router);
};
