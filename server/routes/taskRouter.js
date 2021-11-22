module.exports = (app) => {
  const TaskController = require("../controllers/taskController");
  const { authJwt } = require("../middlewares/index");
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // _______________________ /task/ _______________________ //

  app.route("/api/task").get([authJwt.verifyToken], TaskController.getAll);
  app
    .route("/api/task/add")
    .post([authJwt.verifyToken], TaskController.createTask);
  app
    .route("/api/task/card/:cardId")
    .get([authJwt.verifyToken], TaskController.getTaskByCardId);
  app
    .route("/api/task/update/:taskId")
    .put([authJwt.verifyToken], TaskController.updateByID);
  app
    .route("/api/task/delete/:taskId")
    .delete([authJwt.verifyToken], TaskController.deleteById);
};
