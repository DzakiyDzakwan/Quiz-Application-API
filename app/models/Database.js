import db from "./../../config/connection.js";

export default class Database {
  constructor(table_name) {
    this.table_name = table_name;
  }

  static table(table_name) {
    let database = new Database(table_name);
    return database;
  }

  async truncate() {
    let query = `
        DELETE FROM ${this.table_name}
    `;

    try {
      let [result, fields] = await db.query(query);

      return result;
    } catch (error) {
      throw error;
    }
  }

  static async create(data) {
    let query = `
        INSERT INTO ${this.table} SET ?
    `;

    let payload = {
      ...data,
      updated_at: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
    };

    try {
      let [result, fields] = await db.query(query, payload);

      return result;
    } catch (error) {
      throw error;
    }
  }
}
