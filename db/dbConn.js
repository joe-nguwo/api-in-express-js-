import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  "postgres",
  "2001841",
  {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
  },
);

export async function conn() {
  try {
    sequelize.authenticate();
    return true;
  } catch (error) {
    return error;
  }
}
