module.exports = (sequelize, DataTypes) => {
  const Timesheet = sequelize.define("Timesheet", {
    approval: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    dept_no: {
      type: DataTypes.CHAR(4),
      allowNull: false
    },
    emp_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    no_hours: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    manager_emp_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Timesheet.associate = (models) => {
    Timesheet.belongsTo(models.Employee, { foreignKey: 'emp_no' });
  };

  return Timesheet;
};
