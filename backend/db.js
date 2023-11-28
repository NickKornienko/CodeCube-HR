// db.js
const Sequelize = require("sequelize");
const secrets = require("./secrets.json").employees;

const sequelize = new Sequelize(secrets.NAME, secrets.USER, secrets.PASSWORD, {
  host: secrets.HOST,
  dialect: "mysql",
  port: secrets.PORT,
});

const User = require("./models/user.model")(sequelize, Sequelize.DataTypes);

module.exports = { sequelize, User };
