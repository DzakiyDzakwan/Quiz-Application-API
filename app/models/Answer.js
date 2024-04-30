import db from "./.././../config/connection.js";
import moment from "moment";
import Question from "./Question.js";

export default class Answer {
  constructor(data = {}) {
    this.id = data.id || null;
    this.content = data.content || null;
    this.question_id = data.question_id || null;
    this.is_correct = data.is_correct || null;
    this.created_at = data.created_at || null;
    this.updated_at = data.updated_at || null;
    this.deleted_at = data.deleted_at || null;
  }

  static async all() {
    const query = `SELECT * FROM answers`;

    try {
      const [results, fields] = await db.query(query);

      let answers = results.map((result) => {
        return new Room(result);
      });

      return answers;
    } catch (error) {
      throw error;
    }
  }

  static async find(id) {
    let query = `SELECT * FROM answers WHERE id = ${id}`;

    try {
      const [results, fields] = await db.query(query);

      if (results[0]) {
        return new Answer(results[0]);
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  static async findOrFail(id) {
    let query = `SELECT * FROM answers WHERE id = ${id}`;

    try {
      const [results, fields] = await db.query(query);

      if (results[0]) {
        return new Answer(results[0]);
      }

      throw new Error(`tidak dapat menemukan jawaban dengan id ${id}`);
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

    const query = `SELECT * FROM answers WHERE ${conditions.join(" AND ")}`;

    try {
      const [results, fields] = await db.query(query);

      let answers = results.map((result) => {
        return new Answer(result);
      });

      return answers;
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

    const query = `SELECT * FROM answers WHERE ${conditions.join(" AND ")}`;

    try {
      const [results, fields] = await db.query(query);

      let answers = results.map((result) => {
        return new Answer(result);
      });

      return answers[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(data) {
    let query = `INSERT INTO answers SET ?`;

    let payload = {
      ...data,
      updated_at: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
    };

    try {
      let [result, fields] = await db.query(query, payload);

      return await Answer.find(result.insertId);
    } catch (error) {
      throw error;
    }
  }

  async update(data) {
    let payload = [
      data.content || this.content,
      data.is_correct || this.is_correct,
      moment().utc().format("YYYY-MM-DD HH:mm:ss"),
    ];

    let query = `
            UPDATE answers SET content = ?, is_correct = ?, updated_at = ? WHERE id = ${this.id}
            `;

    try {
      let [results, fields] = await db.query(query, payload);

      return await Answer.find(this.id);
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    let query = `DELETE FROM answers WHERE id = ${this.id}`;

    try {
      let [results, fields] = await db.query(query);

      return results;
    } catch (error) {
      throw error;
    }
  }

  async softDelete() {
    let query = `UPDATE answers SET deleted_at = ? WHERE id = ${this.id}`;
    try {
      let [results, fields] = await db.query(
        query,
        moment().utc().format("YYYY-MM-DD HH:mm:ss")
      );

      return results;
    } catch (error) {
      throw error;
    }
  }

  async question() {
    // let query = `
    // SELECT questions.id, questions.quiz_id, questions.question_order, questions.content, questions.created_at, questions.updated_at, questions.deleted_at
    // FROM questions
    // JOIN answers
    // ON questions.id = answers.question_id
    // WHERE answers.id = ${this.id}
    // `;

    try {
      // let [results, fields] = await db.query(query);

      let _question = await Question.find(this.question_id);

      this._question = _question;

      return _question;
    } catch (error) {
      throw error;
    }
  }
}
