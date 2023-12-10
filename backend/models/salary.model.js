module.exports = (sequelize, DataTypes) => {
  const Salaries = sequelize.define(
    "Salaries",
    {
      emp_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "Employees",
          key: "emp_no",
        },
      },
      from_date: {
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true,
      },
      salary: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      to_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "Salaries",
    }
  );

  Salaries.associate = (models) => {
    Salaries.belongsTo(models.Employee, { foreignKey: "emp_no" });
  };

  return Salaries;
};
