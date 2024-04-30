import db from "./../../config/connection.js";
import moment from "moment";
import Role from "./Role.js";
import Permission from "./Permission.js";
import Quiz from "./Quiz.js";
import Room from "./Room.js";
import Attempt from "./Attempt.js";

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

      return null;
    } catch (error) {
      throw error;
    }
  }

  static async findOrFail(id) {
    let query = `SELECT * FROM users WHERE id = ${id}`;

    try {
      const [results, fields] = await db.query(query);

      if (results[0]) {
        return new User(results[0]);
      }

      throw new Error(`tidak dapat menemukan user dengan id ${id}`);
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
    const conditions = Object.entries(criteria).map(([column, value]) => {
      if (value === "null") {
        return `${column} IS NULL`;
      } else if (value === "notnull") {
        return `${column} IS NOT NULL`;
      } else {
        return `${column} = '${value}'`;
      }
    });

    const query = `SELECT * FROM users WHERE ${conditions.join(" AND ")}`;
    try {
      const [results, fields] = await db.query(query);

      let users = results.map((result) => {
        return new User(result);
      });

      if (users[0]) {
        return users[0];
      }

      return null;
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
      SELECT roles.* 
      FROM roles 
      JOIN user_roles
      ON roles.id = user_roles.role_id
      WHERE user_roles.user_id = ${this.id}
      `;

    try {
      let [results, fields] = await db.query(query);

      let _roles = [];

      for (const result of results) {
        let role = await Role.find(result.id);
        _roles.push(role);
      }

      this._roles = _roles;

      return _roles;
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
      return "Role sudah tersedia";
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

  async hasRoles(roles = []) {
    try {
      let _roles = await this.roles();

      let hasRole = _roles.some((role) => roles.includes(role.name));

      return hasRole;
    } catch (error) {
      throw error;
    }
  }

  async permissions() {
    let query = `
        SELECT permissions.*
        FROM permissions
        JOIN user_permissions
        ON permissions.id = user_permissions.permission_id
        WHERE user_permissions.user_id = ${this.id}
      `;
    try {
      let [results, fields] = await db.query(query);

      let _permissions = [];

      for (const result of results) {
        let role = await Permission.find(result.id);
        _permissions.push(role);
      }

      this._permissions = _permissions;

      return _permissions;
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

  async hasPermissions(permissions = []) {
    try {
      let hasUserPermission = false;
      let hasRolePermission = false;

      let _permissions = await this.permissions();

      if (_permissions) {
        hasUserPermission = _permissions.some((permission) =>
          permissions.includes(permission.name)
        );
      }

      let _roles = await this.roles();

      if (_roles) {
        for (const role of _roles) {
          hasRolePermission = await role.hasPermissions(permissions);
          if (hasRolePermission) break;
        }
      }

      return hasUserPermission || hasRolePermission;
    } catch (error) {
      throw error;
    }
  }

  async rooms() {
    try {
      let _rooms = await Room.whereAll({ room_master: this.id });

      this._rooms = _rooms;

      return _rooms;
    } catch (error) {
      throw error;
    }
  }

  async quizzes() {
    try {
      let _quizzes = await Quiz.whereAll({ user_id: this.id });

      this._quizzes = _quizzes;

      return _quizzes;
    } catch (error) {
      throw error;
    }
  }

  async attempts() {
    try {
      let _attempts = await Attempt.whereAll({ user_id: this.id });

      for (const attempt of _attempts) {
        await attempt.quiz();
      }

      this._attempts = _attempts;

      return _attempts;
    } catch (error) {
      throw error;
    }
  }
}
