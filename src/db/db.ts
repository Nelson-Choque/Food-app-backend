import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";

console.log("data s1");

let dbConnection: DataSource;

export const getDatabaseConnection = async () => {
  console.log(dbConnection);
  if (!dbConnection) {
    dbConnection = await AppDataSource.initialize();
    console.log(dbConnection);
  }
  return dbConnection;
};
