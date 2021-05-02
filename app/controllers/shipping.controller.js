const db = require("../models");
const Shipping = db.shippings;
const Op = db.Sequelize.Op;

// Create and Save a new Shipping
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Shipping
  const shipping = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  // Save Shipping in the database
  Shipping.create(shipping)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Shipping.",
      });
    });
};

// Retrieve all Shippings from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  const size = req.query.size || 25;
  const page = req.query.page || 0;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Shipping.findAll({
    where: condition,
    order: [["updatedAt", "DESC"]],
    offset: size * page,
    limit: size,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Shippings.",
      });
    });
};

// Find a single Shipping with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Shipping.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Shipping with id=" + id,
      });
    });
};

// Update a Shipping by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Shipping.update(req.body, {
    where: { id: id },
  })

    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Shipping was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Shipping with id=${id}. Maybe Shipping was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Shipping with id=" + id,
      });
    });
};

// Delete a Shipping with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Shipping.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Shipping was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Shipping with id=${id}. Maybe Shipping was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Shipping with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Shipping.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Shippings were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Shippings.",
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Shipping.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Shippings.",
      });
    });
};
