import connection from "./../../config/connection.js";
import moment from "moment";

export default class User {
  constructor(data = {}) {
    this.id = data.id || null;
    this.fullname = data.fullname || null;
    this.username = data.username || null;
    this.email = data.email || null;
    this.password = data.password || null;
    this.created_at = data.created_at || null;
    this.updated_at = data.updated_at || null;
    this.updated_at = data.deleted_at || null;
  }

  static async all() {
    let query = `SELECT * FROM users`;

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
    let query = `SELECT * FROM users WHERE id = ${id}`;
    try {
      const [result] = await new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });

      if (!result) {
        return { message: `Tidak dapat menemukan user dengan id: ${id}` };
      }

      return new User(result);
    } catch (error) {
      throw error;
    }
  }

  static async create(data) {
    let query = `INSERT INTO users SET ?`;

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

      const userId = result.insertId;

      const user = await this.find(userId);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async update(data) {
    let payload = [
      data.fullname || this.fullname,
      data.username || this.username,
      data.email || this.email,
      data.password || this.password,
      moment().utc().format("YYYY-MM-DD HH:mm:ss"),
    ];

    let query = `
    UPDATE users SET fullname = ?, username = ?, email = ?, password = ?, updated_at = ? WHERE id = ${this.id}
    `;

    try {
      let result = await new Promise((resolve, reject) => {
        connection.query(query, values, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });

      const userId = this.id;

      const user = await User.find(userId);

      return user;
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    let query = `DELETE FROM users WHERE id = ${this.id}`;
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

  async roles() {
    try {
      let query = `
      SELECT roles.id, roles.name, roles.display_name, roles.created_at, roles.updated_at 
      FROM roles 
      JOIN user_roles
      ON roles.id = user_roles.role_id
      WHERE user_roles.user_id = ${this.id}
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
        JOIN user_permissions
        ON permissions.id = user_permissions.role_id
        WHERE user_permissions.user_id = ${this.id}
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

  async hasRoles(roles = []) {
    const escapedRoles = roles.map((role) => connection.escape(role));

    let query = `
        SELECT COUNT(*)
        FROM roles
        JOIN user_roles
        ON user_roles.role_id = roles.id
        WHERE user_roles.user_id = ${this.id}
        AND roles.name IN (${escapedRoles.join(",")})
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

  async hasPermissions(permissions = []) {
    const escapedPermissions = permissions.map((permission) =>
      connection.escape(permission)
    );

    let query = `
        SELECT COUNT(*)
        FROM permissons
        JOIN user_permissons
        ON user_permissons.permission_id = permissons.id
        WHERE user_permissons.user_id = ${this.id}
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

  async attempts() {
    let query = `
    SELECT participants.attempt_code as code,  partcipants.name, participants.score, attempts.status, quizzes.title, quizzes.description, quizzes.difficulty
    FROM participants
    JOIN attempts
    ON attempts.code = participants.attempt_code
    JOIN quizzes
    ON quizzes.id = attempts.quiz_id
    WHERE participants.user_id = ${this.id}
    `;

    try {
      let result = connection.query(query, (err, result) => {
        if (err) reject(err);
        return result;
      });
    } catch (error) {
      throw error;
    }
  }

  async quizzes() {
    let query = `
    SELECT * FROM quizzes
    JOIN users
    ON users.id = quizzes.room_master
    WHERE quizzes.room_master = ${this.id}
    `;

    try {
      let result = connection.query(query, (err, result) => {
        if (err) reject(err);
        return result;
      });
    } catch (error) {
      throw error;
    }
  }
}
