module.exports = (sequelize, DataTypes) => {
  const Dept_manager = sequelize.define("Dept_manager", {
    dept_no: {
      type: DataTypes.CHAR(4),
      allowNull: false,
      primaryKey: true,
    },
    emp_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    from_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      primaryKey: true,
    },
    to_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });

  Dept_manager.associate = (models) => {
    Dept_manager.belongsTo(models.Employee, { foreignKey: "emp_no" });
    Dept_manager.hasOne(models.Dept_emp, { foreignKey: "dept_no" });
  };

  return Dept_manager;
};
