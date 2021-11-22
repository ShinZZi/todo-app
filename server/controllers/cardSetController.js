const CardSet = require("../models/index.js").cardset;

exports.getAll = async (req, res) => {
  CardSet.findAll()
    .then((cardsets) => {
      res.status(200).json(cardsets);
    })
    .catch((err) => {
      res.status(501).send(err);
    });
};

exports.getByCardSetId = async (req, res) => {
  CardSet.findByPk(req.params.cardSetId)
    .then((cardset) => {
      if (cardset) {
        res.status(200).json(cardset);
      } else {
        res.status(404).json({ message: "Cardset not found" });
      }
    })
    .catch((err) => {
      res.status(501).send(err);
    });
};

exports.getByUserId = async (req, res) => {
  CardSet.findOne({ where: { user_id: req.params.userId } })
    .then((cardset) => {
      if (cardset) {
        res.status(200).json(cardset.dataValues);
      } else {
        res.status(404).json({ message: "Cardset not found" });
      }
    })
    .catch((err) => {
      res.status(501).send(err);
    });
};
