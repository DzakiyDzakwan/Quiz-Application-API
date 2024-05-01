import db from "./../../config/connection.js";
import moment from "moment";
import Quiz from "./Quiz.js";
import User from "./User.js";
import Response from "./Response.js";

export default class Attempt {
  constructor(data = {}) {
    this.id = data.id || null;
    this.quiz_id = data.quiz_id || null;
    this.user_id = data.user_id || null;
    this.score = data.score || null;
    this.time_remaining = data.time_remaining || null;
    this.created_at = data.created_at || null;
    this.updated_at = data.updated_at || null;
    this.finished_at = data.finished_at || null;
  }

  static async all() {
    const query = `SELECT * FROM attempts`;

    try {
      const [results, fields] = await db.query(query);

      let attempts = results.map((result) => {
        return new Attempt(result);
      });

      return attempts;
    } catch (error) {
      throw error;
    }
  }

  static async find(id) {
    let query = `SELECT * FROM attempts WHERE id = ${id}`;

    try {
      const [results, fields] = await db.query(query);

      if (results[0]) {
        return new Attempt(results[0]);
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  static async findOrFail(id) {
    let query = `SELECT * FROM attempts WHERE id = ${id}`;

    try {
      const [results, fields] = await db.query(query);

      if (results[0]) {
        return new Attempt(results[0]);
      }

      throw new Error(`tidak dapat menemukan percobaan dengan id ${id}`);
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

    const query = `SELECT * FROM attempts WHERE ${conditions.join(" AND ")}`;

    try {
      const [results, fields] = await db.query(query);

      let attempts = results.map((result) => {
        return new Attempt(result);
      });

      return attempts;
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

    const query = `SELECT * FROM attempts WHERE ${conditions.join(" AND ")}`;

    try {
      const [results, fields] = await db.query(query);

      let attempts = results.map((result) => {
        return new Attempt(result);
      });

      return attempts[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(data) {
    let query = `INSERT INTO attempts SET ?`;

    let payload = {
      ...data,
      updated_at: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
    };

    try {
      let [result, fields] = await db.query(query, payload);

      return await Attempt.find(result.insertId);
    } catch (error) {
      throw error;
    }
  }

  async update(data) {
    let payload = [
      data.score || this.score,
      data.time_remaining || this.time_remaining,
      data.finished_at || null,
      moment().utc().format("YYYY-MM-DD HH:mm:ss"),
    ];

    let query = `
            UPDATE attempts SET score = ?, time_remaining = ?, finished_at = ?, updated_at = ? WHERE id = ${this.id}
            `;

    try {
      let [results, fields] = await db.query(query, payload);

      return await Attempt.find(this.id);
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    let query = `DELETE FROM attempts WHERE id = ${this.id}`;
    try {
      let [results, fields] = await db.query(query);

      return results;
    } catch (error) {
      throw error;
    }
  }

  async user() {
    // let query = `
    //     SELECT users.id, users.fullname, users.username, users.email, users.password, users.created_at, users.updated_at
    //     FROM users
    //     JOIN attempts
    //     ON users.id = attempts.user_id
    //     WHERE attempts.id = ${this.id}
    //     AND users.deleted_at IS NOT NULL
    //     `;

    try {
      // let [results, fields] = await db.query(query);

      let _user = await User.find(this.user_id);

      this._user = _user;

      return _user;
    } catch (error) {
      throw error;
    }
  }

  async quiz() {
    // let query = `
    //     SELECT *
    //     FROM quizzes
    //     JOIN attempts
    //     ON quizzes.id = attempts.quiz_id
    //     WHERE attempts.id = ${this.id}
    //     `;

    try {
      // let [results, fields] = await db.query(query);

      let _quiz = await Quiz.find(this.quiz_id);

      this._quiz = _quiz;

      return _quiz;
    } catch (error) {
      throw error;
    }
  }

  async responses() {
    try {
      let _responses = await Response.whereAll({ attempt_id: this.id });

      this._responses = _responses;

      return _responses;
    } catch (error) {
      throw error;
    }
  }
}
