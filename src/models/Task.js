const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM("OPEN", "IN_PROGRESS", "COMPLETED"),
    defaultValue: "OPEN",
  },
  dueDate: {
    type: DataTypes.DATE, // Define the data type as DATE for dueDate
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Task;
