import {Sequelize} from "sequelize";

const sequelize = new Sequelize("parking_system", "root", "Kh@dijah01", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
