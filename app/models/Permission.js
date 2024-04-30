import db from "./../../config/connection.js";
import moment from "moment";
import User from "./User.js";
import Role from "./Role.js";

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

      return null;
    } catch (error) {
      throw error;
    }
  }

  static async findOrFail(id) {
    let query = `SELECT * FROM permissions WHERE id = ${id}`;

    try {
      const [results, fields] = await db.query(query);

      if (results[0]) {
        return new Permission(results[0]);
      }

      throw new Error(`tidak dapat menemukan permission dengan id ${id}`);
    } catch (error) {
      throw error;
    }
  }

  static async whereAll(criteria) {
    const conditions = Object.entries(criteria).map(([column, value]) => {
      if (value === "null") {
        return `${column} IS NULL`;
      } else if (value === "notnull") {
        return `${column} IS NOT NULL`;
      } else {
        return `${column} = '${value}'`;
      }
    });

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

  static async whereFirst(criteria) {
    const conditions = Object.entries(criteria).map(([column, value]) => {
      if (value === "null") {
        return `${column} IS NULL`;
      } else if (value === "notnull") {
        return `${column} IS NOT NULL`;
      } else {
        return `${column} = '${value}'`;
      }
    });

    const query = `SELECT * FROM permissions WHERE ${conditions.join(" AND ")}`;
    try {
      const [results, fields] = await db.query(query);

      let permissions = results.map((result) => {
        return new Permission(result);
      });

      return permissions[0];
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

      let _users = [];

      for (const result of results) {
        let user = await User.find(result.id);
        _users.push(user);
      }

      this._users = _users;
      return _users;
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

      let _roles = [];

      for (const result of results) {
        let user = await User.find(result.id);
        _roles.push(user);
      }

      this._roles = _roles;
    } catch (error) {
      throw error;
    }
  }
}
