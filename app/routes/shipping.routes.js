module.exports = (app) => {
  const Shippings = require("../controllers/shipping.controller.js");

  var router = require("express").Router();

  // Create a new Shipping
  router.post("/create", Shippings.create);

  // Retrieve all Shippings
  router.get("/list", Shippings.findAll);

  // Retrieve all published Shippings
  router.get("/published", Shippings.findAllPublished);

  // Retrieve a single Shipping
  router.get("/:id", Shippings.findOne);

  // Update a Shipping with id
  router.put("/:id", Shippings.update);

  // Delete a Shipping with id
  router.delete("/:id", Shippings.delete);

  // Delete all Shippings
  router.delete("/", Shippings.deleteAll);

  app.use("/api/shippings", router);
};
