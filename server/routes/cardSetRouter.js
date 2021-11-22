module.exports = (app) => {
  const CardSetController = require("../controllers/cardSetController");
  const { authJwt } = require("../middlewares/index");
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // _______________________ /cardset/ _______________________ //

  app
    .route("/api/cardset")
    .get([authJwt.verifyToken], CardSetController.getAll);

  app
    .route("/api/cardset/:cardSetId")
    .get([authJwt.verifyToken], CardSetController.getByCardSetId);
  app
    .route("/api/cardset/user/:userId")
    .get([authJwt.verifyToken], CardSetController.getByUserId);
};
