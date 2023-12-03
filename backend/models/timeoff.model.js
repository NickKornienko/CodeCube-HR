module.exports = (sequelize, DataTypes) => {
  const Timeoff = sequelize.define("Timeoff", {
    approval: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    dept_no: {
      type: DataTypes.CHAR(4),
      allowNull: false
    },
    emp_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    type_of_leave: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    manager_emp_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Timeoff.associate = (models) => {
    Timeoff.belongsTo(models.Employee, { foreignKey: 'emp_no' });
  };

  return Timeoff;
};
