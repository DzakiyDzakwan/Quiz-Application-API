import db from "./.././../config/connection.js";
import moment from "moment";

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
        return new Room(result);
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

      return results[0];
    } catch (error) {
      throw error;
    }
  }

  static async whereAll(criteria) {
    const conditions = Object.entries(criteria).map(
      ([column, value]) => `${column} = '${value}'`
    );

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
    const conditions = Object.entries(criteria).map(
      ([column, value]) => `${column} = '${value}'`
    );

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

  async quiz() {
    let query = `
    SELECT quizzes.id, quizzes.user_id, quizzes.room_code, quizzes.title, quizzes.description, quizzes.difficulty, quizzes.created_at, quizzes.updated_at 
    FROM quizzes
    JOIN questions
    ON quizzes.id = questions.quiz_id
    WHERE questions.id = ${this.id}
    `;

    try {
      let [results, fields] = await db.query(query);

      this._quiz = results;

      return results;
    } catch (error) {
      throw error;
    }
  }

  async answers() {
    let query = `
    SELECT * FROM answers
    WHERE question_id = ${this.id}
    AND deleted_at = NULL
    `;

    try {
      let [results, fields] = await db.query(query);

      this._answers = results;

      return results;
    } catch (error) {
      throw error;
    }
  }
}
