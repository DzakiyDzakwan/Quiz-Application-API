import connection from "./../../config/connection.js";
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
    let query = `SELECT * FROM roles`;

    try {
      const result = await new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  static async find(id) {
    let query = `SELECT * FROM roles WHERE id = ${id}`;
    try {
      const [result] = await new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });

      if (!result) {
        return { message: `Tidak dapat menemukan role dengan id: ${id}` };
      }

      return new Role(result);
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
      let result = await new Promise((resolve, reject) => {
        connection.query(query, payload, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });

      const role_id = result.insertId;

      const role = await this.find(role_id);

      return role;
    } catch (error) {
      throw error;
    }
  }

  async update(data) {
    let payload = [
      data.name || this.name,
      data.display_name || this.display_name,
      moment().utc().format("YYYY-MM-DD HH:mm:ss"),
    ];

    let query = `
    UPDATE roless SET name = ?, display_name = ?, updated_at = ? WHERE id = ${this.id}
    `;

    try {
      let result = await new Promise((resolve, reject) => {
        connection.query(query, values, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });

      const role_id = this.id;

      const role = await Role.find(role_id);

      return role;
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    let query = `DELETE FROM roles WHERE id = ${this.id}`;
    try {
      let result = new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async users() {
    try {
      let query = `
      SELECT users.id, users.fullname, roles.display_name, roles.created_at, roles.updated_at 
      FROM users
      JOIN user_roles
      ON users.id = user_roles.user_id
      WHERE user_roles.role_id = ${this.id}
      `;

      let result = new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async permissions() {
    try {
      let query = `
        SELECT permissions.id, permissions.name, permissions.display_name, permissions.created_at, permissions.updated_at
        FROM permissions
        JOIN role_permissions
        ON permissions.id = role_permissions.role_id
        WHERE role_permissions.role_id = ${this.id}
      `;

      let result = new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async hasPermissions(permissions = []) {
    const escapedPermissions = permissions.map((permission) =>
      connection.escape(permission)
    );

    let query = `
        SELECT COUNT(*)
        FROM permissons
        JOIN role_permissons
        ON role_permissons.permission_id = permissons.id
        WHERE role_permissons.role_id = ${this.id}
        AND permissons.name IN (${escapedPermissions.join(",")})
    `;

    try {
      let result = new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });

      if (result < 1) {
        return false;
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
