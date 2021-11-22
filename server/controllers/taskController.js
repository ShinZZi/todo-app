const Task = require("../models/index").task;

exports.getAll = async (req, res) => {
  Task.findAll({ order: ["index"] })
    .then((tasks) => {
      if (tasks) {
        res.status(200).json(tasks);
      } else {
        res.status(404).json({ message: "Card not found." });
      }
    })
    .catch((err) => {
      res.status(501).send(err);
    });
};

exports.createTask = async (req, res) => {
  Task.create({
    index: req.body.index,
    name: req.body.name,
    card_id: req.body.card_id,
  })
    .then((task) => {
      if (task) {
        res
          .status(200)
          .send({ message: `Task ${task.id} was created successfully` });
      }
    })
    .catch((err) => {
      res.status(501).send(err);
    });
};

exports.getTaskByCardId = async (req, res) => {
  Task.findAll({ where: { card_id: req.params.cardId }, order: ["index"] })
    .then((task) => {
      if (task) {
        res.status(200).send(task);
      }
    })
    .catch((err) => {
      res.status(501).send(err);
    });
};

exports.updateByID = async (req, res) => {
  Task.update(
    { index: req.body.index, name: req.body.name, card_id: req.body.card_id },
    { where: { id: req.params.taskId } }
  )
    .then((task) => {
      if (task) {
        res.status(200).json({ message: "Update successful." });
      } else {
        res
          .status(404)
          .json({ message: "Cannot update this task. Please try again." });
      }
    })
    .catch((err) => {
      res.status(501).send(err);
    });
};

exports.deleteById = async (req, res) => {
  Task.destroy({ where: { id: req.params.taskId } })
    .then((task) => {
      if (task) {
        res.status(200).json({ message: "Delete successful." });
      } else {
        res.status(404).json({ message: "Cannot delete card." });
      }
    })
    .catch((err) => {
      res.status(501).send(err);
    });
};
