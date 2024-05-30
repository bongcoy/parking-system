// id, user_id, duration, total, car_plate
// id, username, email, password

import sequelize from "../configs/db.js";
import {DataTypes} from "sequelize";
import User from "./users.js";

const Park = sequelize.define(
  "Park",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    car_plate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {timestamps: false},
);

Park.belongsTo(User, {foreignKey: "user_id"});

export default Park;
