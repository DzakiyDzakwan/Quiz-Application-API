import db from "./../../config/connection.js";
import moment from "moment";

export default class Role {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || null;
    this.display_name = data.display_name || null;
    this.created_at = data.created_at || null;
    this.updated_at = data.updated_at || null;
  }

  static async all() {
    const query = `SELECT * FROM roles`;

    try {
      const [results, fields] = await db.query(query);

      let roles = results.map((result) => {
        return new Role(result);
      });

      return roles;
    } catch (error) {
      throw error;
    }
  }

  static async find(id) {
    let query = `SELECT * FROM roles WHERE id = ${id}`;

    try {
      const [results, fields] = await db.query(query);

      if (results[0]) {
        return new Role(results[0]);
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  static async findOrFail(id) {
    let query = `SELECT * FROM roles WHERE id = ${id}`;

    try {
      const [results, fields] = await db.query(query);

      if (results[0]) {
        return new Role(results[0]);
      }

      throw new Error(`tidak dapat menemukan role dengan id ${id}`);
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

    const query = `SELECT * FROM roles WHERE ${conditions.join(" AND ")}`;

    try {
      const [results, fields] = await db.query(query);

      let roles = results.map((result) => {
        return new Role(result);
      });

      return roles;
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

    const query = `SELECT * FROM roles WHERE ${conditions.join(" AND ")}`;

    try {
      const [results, fields] = await db.query(query);

      let roles = results.map((result) => {
        return new Role(result);
      });

      return roles[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(data) {
    let query = `INSERT INTO roles SET ?`;

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
      data.display_name || this.display_name,
      moment().utc().format("YYYY-MM-DD HH:mm:ss"),
    ];

    let query = `
    UPDATE roles SET name = ?, display_name = ?, updated_at = ? WHERE id = ${this.id}
    `;

    try {
      let [results, fields] = await db.query(query, payload);

      return await Role.find(this.id);
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    let query = `DELETE FROM roles WHERE id = ${this.id}`;
    try {
      let [results, fields] = await db.query(query);

      return results;
    } catch (error) {
      throw error;
    }
  }

  async users() {
    let query = `
      SELECT users.id, users.fullname, roles.display_name, roles.created_at, roles.updated_at 
      FROM users
      JOIN user_roles
      ON users.id = user_roles.user_id
      JOIN roles
      ON roles.id = user_roles.role_id
      WHERE user_roles.role_id = ${this.id}
      `;

    try {
      let [results, fields] = await db.query(query);

      this._users = results;
      return results;
    } catch (error) {
      throw error;
    }
  }

  async permissions() {
    let query = `
        SELECT *
        FROM permissions
        INNER JOIN role_permissions
        ON permissions.id = role_permissions.permission_id
        WHERE role_permissions.role_id = ${this.id}
      `;
    try {
      let [results, fields] = await db.query(query);

      this._permissions = results;

      return results;
    } catch (error) {
      throw error;
    }
  }

  async attachPermissions(permission_ids) {
    if (!permission_ids || permission_ids.length === 0) {
      throw new Error("permission tidak boleh kosong");
    }

    const existingPermissions = await this.permissions();

    const new_permission_ids = permission_ids.filter(
      (permission_id) =>
        !existingPermissions.some(
          (permission) => permission.id === permission_id
        )
    );

    if (new_permission_ids.length === 0) {
      return;
    }

    const values = new_permission_ids.map((permission_id) => [
      permission_id,
      this.id,
      this.updated_at,
    ]);

    const query = `INSERT INTO role_permissions (permission_id, role_id, updated_at) VALUES ?`;

    try {
      let [results, fields] = await db.query(query, [values]);

      return results;
    } catch (error) {
      throw error;
    }
  }

  async detachPermissions(permission_ids) {
    if (!permission_ids || permission_ids.length === 0) {
      throw new Error("permission tidak boleh kosong");
    }

    const query = `DELETE FROM role_permissions WHERE role_id = ? AND permission_id IN (?)`;

    try {
      let [results, fields] = await db.query(query, [this.id, permission_ids]);

      return results;
    } catch (error) {
      throw error;
    }
  }

  async hasPermissions(permissions = []) {
    try {
      let _permissions = await this.permissions();

      let hasPermission = _permissions.some((permission) =>
        permissions.includes(permission.name)
      );

      return hasPermission;
    } catch (error) {}
  }
}
