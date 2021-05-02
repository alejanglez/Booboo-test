const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const messagebird = require("messagebird")(process.env.MESSAGEBIRD_API_KEY);

const bcryptjs = require("bcryptjs");
const saltRounds = 10;

exports.first = (req, res) => {
  let { number } = req.body;

  // Make request to Verify API
  messagebird.verify.create(
    number,
    {
      originator: "Code",
      template: "Your verification code is %token.",
    },
    function (err, response) {
      if (err) {
        // Request has failed
        console.log(err);
        res.status(400).json({
          error: err.errors[0].description,
        });
      } else {
        // Request was successful
        console.log(response);
        res.status(200).json({
          id: response.id,
          phoneNumber: number,
        });
      }
    }
  );
};

exports.second = (req, res) => {
  const { id, token } = req.body;

  messagebird.verify.verify(id, token, function (err, response) {
    if (err) {
      // Verification has failed
      res.status(400).json({
        error: err.errors[0].description,
        id: id,
      });
    } else if (response) {
      res.status(200).json({
        success: "verification successful",
        response,
        id: id,
      });
    }
  });
};

// Create and Save a new User
exports.signup = (req, res) => {
  // Create a User
  const { firstName, email, password } = req.body;

  // Validate request
  if (!firstName || !email || !password) {
    res.status(400).json({
      errorMessage:
        "All fields are mandatory. Please provide your firstName, email, password",
    });
    return;
  }

  // make sure passwords are strong:

  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(200).json({
      errorMessage:
        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      const user = {
        firstName: firstName,
        email: email,
        passwordHash: hashedPassword,
      };

      // Save Tutorial in the database
      User.create(user).then((data) => {
        res.send(data);
      });
    })

    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Profile.",
      });
    });
};

// Find a single User with an id
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (email === "" || password === "") {
    res.status(500).json({
      errorMessage: "Please enter both, email and password to login.",
    });
    return;
  }

  User.findOne({ email: email })
    .then((profileInformation) => {
      if (!profileInformation) {
        res.status(200).json({
          errorMessage: "Email is not registered. Try with other email.",
        });
        return;
      } else if (
        bcryptjs.compareSync(password, profileInformation.passwordHash)
      ) {
        res.status(200).json({ profileInformation });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const { email } = req.body;

  User.destroy({
    where: { email: email },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
