module.exports = (sequelize, DataTypes) => {
  const Dept_emp = sequelize.define("Dept_emp", {
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

  Dept_emp.associate = (models) => {};

  return Dept_emp;
};
