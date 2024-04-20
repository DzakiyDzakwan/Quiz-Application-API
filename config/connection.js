import mysql2 from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const DB_PORT = process.env.DB_PORT;
const DB_HOST = process.env.MYSQL_HOST;
const DB_USER = process.env.MYSQL_USER;
const DB_PASS = process.env.MYSQL_PASSWORD;
const DB_NAME = process.env.MYSQL_DB_NAME;

const pool = mysql2.createPool({
  port: DB_PORT,
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASS,
  waitForConnections: true,
  maxIdle: 10,
  idleTimeout: 60000,
});

export default pool;
