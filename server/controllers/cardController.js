const Card = require("../models/index").card;

exports.getAll = (req, res) => {
  Card.findAll()
    .then((cards) => {
      if (cards) res.status(200).json(cards);
    })
    .catch((err) => {
      res.status(501).send(err);
    });
};

exports.getTodoCardByCardSetId = async (req, res) => {
  Card.findOne({ where: { cardset_id: req.query.cardset_id, index: 0 } })
    .then((card) => {
      if (card) {
        res.status(200).json(card);
      } else {
        res.status(404).json({ message: "Card not found." });
      }
    })
    .catch((err) => {
      res.status(501).send(err);
    });
};

exports.getById = async (req, res) => {
  Card.findByPk(req.params.cardId)
    .then((card) => {
      if (card) {
        res.status(200).json(card);
      } else {
        res.status(404).json({ message: "Card not found" });
      }
    })
    .catch((err) => {
      res.status(501).send(err);
    });
};

exports.updateById = async (req, res) => {
  Card.update(
    {
      index: req.body.index,
      title: req.body.title,
      cardset_id: req.body.cardId,
    },
    {
      where: { id: req.params.cardId },
    }
  )
    .then((card) => {
      if (card) {
        res.status(200).json({ message: "Update successful." });
      } else {
        res
          .status(404)
          .json({ message: "Cannot update this card. Please try again." });
      }
    })
    .catch((err) => {
      res.status(501).send(err);
    });
};

exports.createCard = async (req, res) => {
  Card.create({
    index: req.body.index,
    title: req.body.title,
    cardset_id: req.body.cardset_id,
  })
    .then((card) => {
      if (card) {
        res.status(200).json(card);
      } else {
        res.status(404).json({ message: "Cannot create card." });
      }
    })
    .catch((err) => {
      res.status(501).send(err);
    });
};

exports.deleteById = async (req, res) => {
  Card.destroy({
    where: { id: req.params.cardId },
  })
    .then((card) => {
      if (card) {
        res.status(200).json({ message: "Delete successful." });
      } else {
        res.status(404).json({ message: "Cannot delete card." });
      }
    })
    .catch((err) => {
      res.status(501).send(err);
    });
};

exports.getByCardSetId = async (req, res) => {
  Card.findAll({
    where: { cardset_id: req.params.cardSetId },
    order: ["index"],
  })
    .then((card) => {
      if (card) {
        res.status(200).json(card);
      } else {
        res.status(404).json({ message: "Cannot delete card." });
      }
    })
    .catch((err) => {
      res.status(501).send(err);
    });
};
