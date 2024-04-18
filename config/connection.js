import mysql2 from "mysql2";
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
  password: DB_PASS,
  database: DB_NAME,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error(err);
    return;
  }

  connection
    .query("SELECT * FROM your_table")
    .then((results) => {
      console.log(results);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      connection.release();
    });
});

export default pool;
