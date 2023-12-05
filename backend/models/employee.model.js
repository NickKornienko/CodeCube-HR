module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "Employee",
    {
      emp_no: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM("M", "F"),
        allowNull: false,
      },
      hire_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  Employee.associate = function (models) {
    Employee.hasOne(models.User, { foreignKey: "employee_id" });
    Employee.hasMany(models.Timesheet, { foreignKey: "emp_no" });
    Employee.hasMany(models.Timeoff, { foreignKey: "emp_no" });
  };

  return Employee;
};
