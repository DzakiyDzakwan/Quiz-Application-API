import db from "./.././../config/connection.js";
import moment from "moment";

export default class Response {
  constructor() {
    this.id = data.id || null;
    this.question_id = data.question_id || null;
    this.attempt_id = data.attempt_id || null;
    this.answer_id = data.answer_id || null;
    this.created_at = data.created_at || null;
    this.updated_at = data.updated_at || null;
  }

  static async all() {
    const query = `SELECT * FROM responses`;

    try {
      const [results, fields] = await db.query(query);

      let responses = results.map((result) => {
        return new Response(result);
      });

      return responses;
    } catch (error) {
      throw error;
    }
  }

  static async find(id) {
    let query = `SELECT * FROM responses WHERE id = ${id}`;

    try {
      const [results, fields] = await db.query(query);

      if (results[0]) {
        return new Response(results[0]);
      }

      return results[0];
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

    const query = `SELECT * FROM responses WHERE ${conditions.join(" AND ")}`;

    try {
      const [results, fields] = await db.query(query);

      let responses = results.map((result) => {
        return new Response(result);
      });

      return responses;
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

    const query = `SELECT * FROM responses WHERE ${conditions.join(" AND ")}`;

    try {
      const [results, fields] = await db.query(query);

      let responses = results.map((result) => {
        return new Response(result);
      });

      return responses[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(data) {
    let query = `INSERT INTO responses SET ?`;

    let payload = {
      ...data,
      updated_at: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
    };

    try {
      let [result, fields] = await db.query(query, payload);

      return await Response.find(result.insertId);
    } catch (error) {
      throw error;
    }
  }

  async update(data) {
    let payload = [
      data.answer_id || null,
      moment().utc().format("YYYY-MM-DD HH:mm:ss"),
    ];

    let query = `
            UPDATE responses SET answer_id = ?, updated_at = ? WHERE id = ${this.id}
            `;

    try {
      let [results, fields] = await db.query(query, payload);

      return await Response.find(this.id);
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    let query = `DELETE FROM responses WHERE id = ${this.id}`;
    try {
      let [results, fields] = await db.query(query);

      return results;
    } catch (error) {
      throw error;
    }
  }

  async quiz() {
    let query = `
        SELECT *
        FROM quizzess
        JOIN responses
        ON quizzes.id = responses.quiz_id
        WHERE responses.id = ${this.id}
        `;

    try {
      let [results, fields] = await db.query(query);

      this._room = results[0];
      return results;
    } catch (error) {
      throw error;
    }
  }

  async question() {
    let query = `
        SELECT *
        FROM questions
        JOIN responses
        ON questions.id = responses.question_id
        WHERE responses.id = ${this.id}
        `;

    try {
      let [results, fields] = await db.query(query);

      this._question = results[0];
      return results;
    } catch (error) {
      throw error;
    }
  }

  async user() {
    let query = `
        SELECT users.id, users.fullname, users.username, users.email
        FROM users
        JOIN attempts
        ON users.id = attempts.user_id
        JOIN responses
        ON attempts.id = responses.attempt_id
        WHERE responses.id = ${this.id}
        `;

    try {
      let [results, fields] = await db.query(query);

      this._user = results[0];
      return results;
    } catch (error) {
      throw error;
    }
  }
}
