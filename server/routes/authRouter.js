module.exports = (app) => {
  const AuthController = require("../controllers/authController");
  const { authJwt, verifySignUp } = require("../middlewares/index");

  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/signin", AuthController.signin);
  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicateUsername],
    AuthController.signup
  );
  app.post("/api/auth", [authJwt.verifyToken], AuthController.authenticate);
};
