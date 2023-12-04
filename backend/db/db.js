const Sequelize = require("sequelize");
const secrets = require("../../secrets.json").employees;

const sequelize = new Sequelize(secrets.NAME, secrets.USER, secrets.PASSWORD, {
  host: secrets.HOST,
  dialect: "mysql",
  port: secrets.PORT,
});

const User = require("../models/user.model")(sequelize, Sequelize.DataTypes);
const Timesheet = require("../models/timesheet.model")(
  sequelize,
  Sequelize.DataTypes
);
const Timeoff = require("../models/timeoff.model")(
  sequelize,
  Sequelize.DataTypes
);
const Employee = require("../models/employee.model")(
  sequelize,
  Sequelize.DataTypes
);

if (User.associate) {
  User.associate({ Employee, Timesheet, Timeoff });
}
if (Employee.associate) {
  Employee.associate({ User, Timesheet, Timeoff });
}
if (Timesheet.associate) {
  Timesheet.associate({ User, Employee });
}
if (Timeoff.associate) {
  Timeoff.associate({ User, Employee });
}

module.exports = {
  sequelize,
  User,
  Timesheet,
  Timeoff,
  Employee,
};
