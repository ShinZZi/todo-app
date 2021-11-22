module.exports = (app) => {
  const CardController = require("../controllers/cardController");
  const { authJwt } = require("../middlewares/index");
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // _______________________ /card/ _______________________ //

  app.route("/api/card").get([authJwt.verifyToken], CardController.getAll);
  app
    .route("/api/card/todo")
    .get([authJwt.verifyToken], CardController.getTodoCardByCardSetId);
  app
    .route("/api/card/:cardId")
    .get([authJwt.verifyToken], CardController.getById);
  app
    .route("/api/card/update/:cardId")
    .put([authJwt.verifyToken], CardController.updateById);
  app
    .route("/api/card/add")
    .post([authJwt.verifyToken], CardController.createCard);
  app
    .route("/api/card/delete/:cardId")
    .delete([authJwt.verifyToken], CardController.deleteById);
  app
    .route("/api/card/cardset/:cardSetId")
    .get([authJwt.verifyToken], CardController.getByCardSetId);
};
