import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const DB_PORT = process.env.DB_PORT;
const DB_HOST = process.env.MYSQL_HOST;
const DB_USER = process.env.MYSQL_USER;
const DB_PASS = process.env.MYSQL_PASSWORD;
const DB_NAME = process.env.MYSQL_DB_NAME;

const connection = mysql.createConnection({
  port: DB_PORT,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

connection.connect(function (err) {
  if (err) console.log(DB_HOST);
  console.log(`Database connected on PORT ${DB_HOST}`);
});

export default connection;
