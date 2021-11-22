const db = require("../models/index");
const User = db.user;

checkDuplicateUsername = (req, res, next) => {
  User.findOne({ where: { name: req.body.name } }).then((user) => {
    if (user) {
      res.status(404).send({ message: "Failed! Username is already used!" });
    } else {
      next();
    }
  });
};

const verifySignUp = { checkDuplicateUsername: checkDuplicateUsername };

module.exports = verifySignUp;
