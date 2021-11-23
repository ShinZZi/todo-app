const db = require("../models/index");
const config = require("../config/auth.config");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  User.create({
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      res.send({ message: `User ${user.id} was created successfully!!` });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({ where: { name: req.body.name } })
    .then((user) => {
      if (!user) return res.status(404).send({ message: "User not found" });
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res
          .status(401)
          .send({ accessToken: null, message: "Invalid password" });
      } else {
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: "15m",
        });
        res.status(200).send({
          id: user.id,
          name: user.name,
          accessToken: token,
        });
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.authenticate = (req, res) => {
  res.status(200).json({ message: "User is authenticated" });
};
