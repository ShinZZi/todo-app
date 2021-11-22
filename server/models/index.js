const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./userModel")(sequelize, Sequelize);
db.cardset = require("./cardSetModel")(sequelize, Sequelize);
db.card = require("./cardModel")(sequelize, Sequelize);
db.task = require("./taskModel")(sequelize, Sequelize);

db.user.hasOne(db.cardset, { foreignKey: "user_id" });
db.cardset.hasMany(db.card, { foreignKey: "cardset_id" });
db.card.hasMany(db.task, { foreignKey: "card_id" });

db.user.afterCreate((user) => {
  db.cardset
    .create({
      user_id: user.id,
    })
    .then((cardSet) => {
      db.card.create({
        index: 0,
        title: "Todo",
        cardset_id: cardSet.id,
      });
      db.card.create({
        index: 1,
        title: "In Progress",
        cardset_id: cardSet.id,
      });
      db.card.create({
        index: 2,
        title: "Completed",
        cardset_id: cardSet.id,
      });
    });
});

module.exports = db;
