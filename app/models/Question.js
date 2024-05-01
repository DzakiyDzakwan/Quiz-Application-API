import db from "./.././../config/connection.js";
import moment from "moment";
import Quiz from "./Quiz.js";
import Answer from "./Answer.js";

export default class Question {
  constructor(data = {}) {
    this.id = data.id || null;
    this.quiz_id = data.quiz_id || null;
    this.question_order = data.question_order || null;
    this.content = data.content || null;
    this.created_at = data.created_at || null;
    this.updated_at = data.updated_at || null;
    this.deleted_at = data.deleted_at || null;
  }

  static async all() {
    const query = `SELECT * FROM questions`;

    try {
      const [results, fields] = await db.query(query);

      let questions = results.map((result) => {
        return new Question(result);
      });

      return questions;
    } catch (error) {
      throw error;
    }
  }

  static async find(id) {
    let query = `SELECT * FROM questions WHERE id = ${id}`;

    try {
      const [results, fields] = await db.query(query);

      if (results[0]) {
        return new Question(results[0]);
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  static async findOrFail(id) {
    let query = `SELECT * FROM questions WHERE id = ${id}`;

    try {
      const [results, fields] = await db.query(query);

      if (results[0]) {
        return new Question(results[0]);
      }

      throw new Error(`tidak dapat menemukan pertanyaan dengan id ${id}`);
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

    const query = `SELECT * FROM questions WHERE ${conditions.join(" AND ")}`;

    try {
      const [results, fields] = await db.query(query);

      let questions = results.map((result) => {
        return new Question(result);
      });

      return questions;
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

    const query = `SELECT * FROM questions WHERE ${conditions.join(" AND ")}`;

    try {
      const [results, fields] = await db.query(query);

      let questions = results.map((result) => {
        return new Question(result);
      });

      return questions[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(data) {
    let query = `INSERT INTO questions SET ?`;

    let payload = {
      ...data,
      updated_at: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
    };

    try {
      let [result, fields] = await db.query(query, payload);

      return await Question.find(result.insertId);
    } catch (error) {
      throw error;
    }
  }

  async update(data) {
    let payload = [
      data.question_order || this.question_order,
      data.content || this.content,
      moment().utc().format("YYYY-MM-DD HH:mm:ss"),
    ];

    let query = `
            UPDATE questions SET question_order = ?, content = ?, updated_at = ? WHERE id = ${this.id}
            `;

    try {
      let [results, fields] = await db.query(query, payload);

      return await Question.find(this.id);
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    let query = `DELETE FROM questions WHERE id = ${this.id}`;
    try {
      let [results, fields] = await db.query(query);

      return results;
    } catch (error) {
      throw error;
    }
  }

  async softDelete() {
    let query = `UPDATE questions SET deleted_at = ? WHERE id = ${this.id}`;
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

  async quiz() {
    try {
      let _quiz = await Quiz.find(this.quiz_id);

      this._quiz = _quiz;

      return _quiz;
    } catch (error) {
      throw error;
    }
  }

  async answers() {
    try {
      let _answers = await Answer.whereAll({
        question_id: this.id,
        deleted_at: "null",
      });

      this._answers = _answers;

      return _answers;
    } catch (error) {
      throw error;
    }
  }
}
