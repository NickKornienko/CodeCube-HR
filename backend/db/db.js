const Sequelize = require("sequelize");
const secrets = require("../../secrets.json").employees;

const sequelize = new Sequelize(secrets.NAME, secrets.USER, secrets.PASSWORD, {
  host: secrets.HOST,
  dialect: "mysql",
  port: secrets.PORT,
});

const User = require("../models/user.model")(sequelize, Sequelize.DataTypes);
const Employee = require("../models/employee.model")(
  sequelize,
  Sequelize.DataTypes
);
const Timesheet = require("../models/timesheet.model")(
  sequelize,
  Sequelize.DataTypes
);
const Timeoff = require("../models/timeoff.model")(
  sequelize,
  Sequelize.DataTypes
);
const Dept_emp = require("../models/dept_emp.model")(
  sequelize,
  Sequelize.DataTypes
);
const Dept_manager = require("../models/dept_manager.model")(
  sequelize,
  Sequelize.DataTypes
);
const Tweet = require("../models/tweet.model")(
  sequelize,
  Sequelize.DataTypes
);

// Associations
if (User.associate) {
  User.associate({ Employee, Timesheet, Timeoff });
}
if (Employee.associate) {
  Employee.associate({ User, Timesheet, Timeoff, Dept_emp, Tweet });
}
if (Timesheet.associate) {
  Timesheet.associate({ User, Employee });
}
if (Timeoff.associate) {
  Timeoff.associate({ User, Employee });
}
if (Dept_emp.associate) {
  Dept_emp.associate({ Employee, Dept_manager });
}
if (Dept_manager.associate) {
  Dept_manager.associate({ Employee, Dept_emp });
}
if (Tweet.associate) {
  Tweet.associate({ Employee });
}

module.exports = {
  sequelize,
  User,
  Timesheet,
  Timeoff,
  Employee,
  Dept_emp,
  Dept_manager,
  Tweet,
};
