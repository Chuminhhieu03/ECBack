const User = require("../models/User.js");


class UserController {
  signup(req, res) {
    const { name, email, password } = req.body;
    User.create({ name, email, password })
      .then((user) => {
        res.json(user);
      })
      .catch((error) => {
        if (error.code === 11000) {
          res.status(400).send("Email already exists");
        } else {
          res.status(400).send(error.message);
        }
      });
  }
  login(req, res) {
    const { email, password } = req.body;
    User.findByCredentials(email, password)
      .then((user) => res.json(user))
      .catch((error) => {
        res.status(error.message);
      });
  }
  get(req, res) {
    User.find({ isAdmin: false })
      .then((user) => res.json(user))
      .catch((error) => res.status(400).send(error.message));
  }
}

module.exports = new UserController();
