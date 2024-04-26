import randomString from "../../helpers/randomString.js";
import db from "./../../config/connection.js";
import moment from "moment";

export default class Room {
  constructor(data = {}) {
    this.code = data.code || null;
    this.room_master = data.room_master || null;
    this.name = data.name || null;
    this.created_at = data.created_at || null;
    this.updated_at = data.updated_at || null;
  }

  static async generateCode() {
    let code = randomString();

    let existsCode = await Room.whereFirst({ code: code });

    if (existsCode) {
      this.generateCode();
    } else {
      return code;
    }
  }

  static async all() {
    const query = `SELECT * FROM rooms`;

    try {
      const [results, fields] = await db.query(query);

      let rooms = results.map((result) => {
        return new Room(result);
      });

      return rooms;
    } catch (error) {
      throw error;
    }
  }

  static async find(code) {
    let query = `SELECT * FROM rooms WHERE code = ${code}`;

    try {
      const [results, fields] = await db.query(query);

      if (results[0]) {
        return new Room(results[0]);
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

    const query = `SELECT * FROM rooms WHERE ${conditions.join(" AND ")}`;

    try {
      const [results, fields] = await db.query(query);

      let rooms = results.map((result) => {
        return new Room(result);
      });

      return rooms;
    } catch (error) {
      throw error;
    }
  }

  static async whereFirst(criteria) {
    const conditions = Object.entries(criteria).map(
      ([column, value]) => `${column} = '${value}'`
    );

    const query = `SELECT * FROM rooms WHERE ${conditions.join(" AND ")}`;

    try {
      const [results, fields] = await db.query(query);

      let rooms = results.map((result) => {
        return new Room(result);
      });

      return rooms[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(data) {
    let query = `INSERT INTO rooms SET ?`;

    let code = await this.generateCode();

    let payload = {
      code: code,
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
      data.room_master || this.room_master,
      data.name || this.name,
      moment().utc().format("YYYY-MM-DD HH:mm:ss"),
    ];

    let query = `
    UPDATE rooms SET room_master = ?, name = ?, updated_at = ? WHERE code = ${this.code}
    `;

    try {
      let [results, fields] = await db.query(query, payload);

      return await Room.find(this.code);
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    let query = `DELETE FROM rooms WHERE code = ${this.code}`;
    try {
      let [results, fields] = await db.query(query);

      return results;
    } catch (error) {
      throw error;
    }
  }

  async user() {
    let query = `
    SELECT users.id, users.fullname, users.username, users.email, users.created_at, users.updated_at
    FROM users
    JOIN rooms
    ON rooms.room_master = users.id
    WHERE rooms.code = ${this.code}
    `;

    try {
      let [results, fields] = await db.query(query);

      this._user = results[0];
      return results;
    } catch (error) {
      throw error;
    }
  }

  async quizzes() {
    let query = `
    SELECT quizzes.id, quizzes.title, quizzes.description, quizzes.difficulty, quizzes.created_at, quizzes.updated_at
    FROM quizzes
    JOIN rooms
    ON quizzes.room_code = rooms.code
    WHERE rooms.code = ${this.code}
    `;

    try {
      let [results, fields] = await db.query(query);

      this._quiizes = results;

      return results;
    } catch (error) {
      throw error;
    }
  }
}
