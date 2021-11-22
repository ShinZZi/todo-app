const express = require("express");
const app = express();

const cors = require("cors");
require("dotenv").config();

// _______________________ APIs DOCUMENT _______________________ //
const swagger = require("./swagger");
swagger(app);

// _______________________ MIDDLEWARE _______________________ //
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// _______________________ CONNECT DATABASE _______________________ //
const db = require("./models/index");

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync DB");
  initial();
});

// _______________________ CREATE INITIAL DATA FOR TESING _______________________ //
const User = db.user;
const initial = () => {
  // USER 1
  User.create({
    name: "user1",
    password: "$2a$08$AQchpBJ/UiDXWVG6C38hoe/xi.y84yTeXIcDSaDvHLsZPBpwfHnZO",
  });
  // USER 2
  User.create({
    name: "user2",
    password: "$2a$08$xVOkWKnzOg8nndMSuBk8u.F439IcG6V4V/KfTlM7ysLeqwkLblzFW",
  });
};

// _______________________ CALL ROUTER _______________________ //
const AuthRouter = require("./routes/authRouter");
const CardSetRouter = require("./routes/cardSetRouter");
const CardRouter = require("./routes/cardRouter");
const TaskRouter = require("./routes/taskRouter");

AuthRouter(app);
CardSetRouter(app);
CardRouter(app);
TaskRouter(app);

const PORT = process.env.PORT || 9999;
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
