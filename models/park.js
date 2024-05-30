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
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_fee: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    plate_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {timestamps: false},
);

Park.belongsTo(User, {foreignKey: "user_id"});

export default Park;
