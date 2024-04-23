import db from "./../../config/connection.js";
import moment from "moment";

export default class Permission {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || null;
    this.display_name = data.display_name || null;
    this.created_at = data.created_at || null;
    this.updated_at = data.updated_at || null;
  }

  static async all() {
    const query = `SELECT * FROM permissions`;

    try {
      const [results, fields] = await db.query(query);

      let permissions = results.map((result) => {
        return new Permission(result);
      });
      return permissions;
    } catch (error) {
      throw error;
    }
  }

  static async find(id) {
    let query = `SELECT * FROM permissions WHERE id = ${id}`;

    try {
      const [results, fields] = await db.query(query);

      if (results[0]) {
        return new Permission(results[0]);
      }

      return results[0];
    } catch (error) {
      throw error;
    }
  }

  static async where(criteria) {
    const conditions = Object.entries(criteria).map(
      ([column, value]) => `${column} = '${value}'`
    );

    const query = `SELECT * FROM permissions WHERE ${conditions.join(" AND ")}`;
    try {
      const [results, fields] = await db.query(query);

      let permissions = results.map((result) => {
        return new Permission(result);
      });

      return permissions;
    } catch (error) {
      throw error;
    }
  }

  static async create(data) {
    let query = `INSERT INTO permissions SET ?`;

    let payload = {
      ...data,
      updated_at: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
    };

    try {
      let [result, fields] = await db.query(query, payload);

      return await this.find(result.insertId);
    } catch (error) {
      throw error;
    }
  }

  async update(data) {
    let payload = [
      data.name || this.fullname,
      data.display_name || this.username,
      moment().utc().format("YYYY-MM-DD HH:mm:ss"),
    ];

    let query = `
    UPDATE permissions SET name = ?, display_name = ?, updated_at = ? WHERE id = ${this.id}
    `;

    try {
      let [results, fields] = await db.query(query, payload);

      return await Permission.find(this.id);
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    let query = `DELETE FROM permissions WHERE id = ${this.id}`;
    try {
      let [results, fields] = await db.query(query);

      return results;
    } catch (error) {
      throw error;
    }
  }

  async users() {
    let query = `
      SELECT users.id, users.fullname, permissions.display_name, permissions.created_at, permissions.updated_at 
      FROM users
      JOIN user_permissions
      ON users.id = user_permissions.user_id
      JOIN permissions
      ON permissions.id = user_permissions.permission_id
      WHERE user_permissions.permission_id = ${this.id}
      `;

    try {
      let [results, fields] = await db.query(query);

      this._users = results;
      return results;
    } catch (error) {
      throw error;
    }
  }

  async roles() {
    let query = `
        SELECT roles.id, roles.name, roles.display_name, roles.created_at, roles.updated_at
        FROM roles
        JOIN role_permissions
        ON roles.id = role_permissions.role_id
        WHERE role_permissions.permission_id = ${this.id}
      `;
    try {
      let [results, fields] = await db.query(query);

      this._roles = results;

      return results;
    } catch (error) {
      throw error;
    }
  }
}
