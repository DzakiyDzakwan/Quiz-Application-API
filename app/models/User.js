import db from "./../../config/connection.js";
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
    this.deleted_at = data.deleted_at || null;
  }

  static async all() {
    const query = `SELECT * FROM users`;

    try {
      const [results, fields] = await db.query(query);

      let users = results.map((result) => {
        return new User(result);
      });

      return users;
    } catch (error) {
      throw error;
    }
  }

  static async find(id) {
    let query = `SELECT * FROM users WHERE id = ${id}`;

    try {
      const [results, fields] = await db.query(query);

      if (results[0]) {
        return new User(results[0]);
      }

      return results[0];
    } catch (error) {
      throw error;
    }
  }

  static async whereAll(criteria) {
    const conditions = Object.entries(criteria).map(
      ([column, value]) => `${column} = '${value}'`
    );

    const query = `SELECT * FROM users WHERE ${conditions.join(" AND ")}`;
    try {
      const [results, fields] = await db.query(query);

      let users = results.map((result) => {
        return new User(result);
      });

      return users;
    } catch (error) {
      throw error;
    }
  }

  static async whereFirst(criteria) {
    const conditions = Object.entries(criteria).map(
      ([column, value]) => `${column} = '${value}'`
    );

    const query = `SELECT * FROM users WHERE ${conditions.join(" AND ")}`;
    try {
      const [results, fields] = await db.query(query);

      let users = results.map((result) => {
        return new User(result);
      });

      return users[0];
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
      let [result, fields] = await db.query(query, payload);

      return await User.find(result.insertId);
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
      let [results, fields] = await db.query(query, payload);

      return await User.find(this.id);
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    let query = `DELETE FROM users WHERE id = ${this.id}`;
    try {
      let [results, fields] = await db.query(query);

      return results;
    } catch (error) {
      throw error;
    }
  }

  async roles() {
    let query = `
      SELECT roles.id, roles.name, roles.display_name, roles.created_at, roles.updated_at 
      FROM roles 
      JOIN user_roles
      ON roles.id = user_roles.role_id
      WHERE user_roles.user_id = ${this.id}
      `;

    try {
      let [results, fields] = await db.query(query);

      this._roles = results;

      return results;
    } catch (error) {
      throw error;
    }
  }

  async attachRoles(role_ids) {
    if (!role_ids || role_ids.length === 0) {
      throw new Error("roles tidak boleh kosong");
    }

    const existingRoles = await this.roles();
    const new_role_ids = role_ids.filter(
      (role_id) => !existingRoles.some((role) => role.id === role_id)
    );

    if (new_role_ids.length === 0) {
      return "Role sudah tersedia"; // Tidak ada role baru yang perlu ditambahkan
    }

    const values = new_role_ids.map((role_id) => [
      this.id,
      role_id,
      moment().utc().format("YYYY-MM-DD HH:mm:ss"),
    ]);

    const query = `INSERT INTO user_roles (user_id, role_id, updated_at) VALUES ?`;

    try {
      let [results, fields] = await db.query(query, [values]);

      return results;
    } catch (error) {
      throw error;
    }
  }

  async detachRoles(role_ids) {
    if (!role_ids || role_ids.length === 0) {
      throw new Error("roles tidak boleh kosong");
    }

    const query = `DELETE FROM user_roles WHERE user_id = ? AND role_id IN (?)`;

    try {
      let [results, fields] = await db.query(query, [this.id, role_ids]);

      await this.roles();

      return results;
    } catch (error) {
      throw error;
    }
  }

  // async hasRoles(roles = []) {
  //   const escapedRoles = roles.map((role) => connection.escape(role));

  //   let query = `
  //       SELECT COUNT(*)
  //       FROM roles
  //       JOIN user_roles
  //       ON user_roles.role_id = roles.id
  //       WHERE user_roles.user_id = ${this.id}
  //       AND roles.name IN (${escapedRoles.join(",")})
  //   `;

  //   try {
  //     let result = new Promise((resolve, reject) => {
  //       connection.query(query, (err, result) => {
  //         if (err) reject(err);
  //         resolve(result);
  //       });
  //     });

  //     if (result < 1) {
  //       return false;
  //     }

  //     return true;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async permissions() {
    let query = `
        SELECT permissions.id, permissions.name, permissions.display_name, permissions.created_at, permissions.updated_at
        FROM permissions
        JOIN user_permissions
        ON permissions.id = user_permissions.permission_id
        WHERE user_permissions.user_id = ${this.id}
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
      return; // Tidak ada permission baru yang perlu ditambahkan
    }

    const values = new_permission_ids.map((permission_id) => [
      this.id,
      permission_id,
      moment().utc().format("YYYY-MM-DD HH:mm:ss"),
    ]);

    const query = `INSERT INTO user_permissions (user_id, permission_id, updated_at) VALUES ?`;

    try {
      let [results, fields] = await db.query(query, [values]);

      return results;
    } catch (error) {
      throw error;
    }
  }

  async detachPermissions(permission_ids) {
    if (!permission_ids || permission_ids.length === 0) {
      throw new Error("Permission cannot be empty");
    }

    const query = `DELETE FROM user_permissions WHERE user_id = ? AND permission_id IN (?)`;

    try {
      let [results, fields] = await db.query(query, [this.id, permission_ids]);

      return results;
    } catch (error) {
      throw error;
    }
  }

  // async hasPermissions(permissions = []) {
  //   const escapedPermissions = permissions.map((permission) =>
  //     connection.escape(permission)
  //   );

  //   let query = `
  //       SELECT COUNT(*)
  //       FROM permissons
  //       JOIN user_permissons
  //       ON user_permissons.permission_id = permissons.id
  //       WHERE user_permissons.user_id = ${this.id}
  //       AND permissons.name IN (${escapedPermissions.join(",")})
  //   `;

  //   try {
  //     let result = new Promise((resolve, reject) => {
  //       connection.query(query, (err, result) => {
  //         if (err) reject(err);
  //         resolve(result);
  //       });
  //     });

  //     if (result < 1) {
  //       return false;
  //     }

  //     return true;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async rooms() {
    try {
      let query = `
      SELECT rooms.code, rooms.room_master, rooms.name 
      FROM rooms
      JOIN users ON users.id = rooms.room_master
      WHERE rooms.room_master = ${this.id}
      `;

      let [results, fields] = await db.query(query);

      this._rooms = results;

      return results;
    } catch (error) {
      throw error;
    }
  }

  async quizzes() {
    try {
      let query = `
      SELECT quizzes.id, quizzes.title, quizzes.description, quizzes.difficulty, quizzes.created_at, quizzes.updated_at
      FROM quizzes
      INNER JOIN users ON users.id = quizzes.user_id
      WHERE users.id = ${this.id}
      `;

      let [results, fields] = await db.query(query);

      this._quizzes = results;

      return results;
    } catch (error) {
      throw error;
    }
  }
}
