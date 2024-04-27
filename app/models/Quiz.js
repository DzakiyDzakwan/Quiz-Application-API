import db from "./../../config/connection.js";
import moment from "moment";

export default class Quiz {
  constructor(data = {}) {
    this.id = data.id || null;
    this.user_id = data.user_id || null;
    this.room_code = data.room_code || null;
    this.title = data.title || null;
    this.description = data.description || null;
    this.difficulty = data.difficulty || null;
    this.created_at = data.created_at || null;
    this.updated_at = data.updated_at || null;
  }

  static async all() {
    const query = `SELECT * FROM quizzes`;

    try {
      const [results, fields] = await db.query(query);

      let quizzes = results.map((result) => {
        return new Room(result);
      });

      return quizzes;
    } catch (error) {
      throw error;
    }
  }

  static async find(id) {
    let query = `SELECT * FROM quizzes WHERE id = ${id}`;

    try {
      const [results, fields] = await db.query(query);

      if (results[0]) {
        return new Quiz(results[0]);
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

    const query = `SELECT * FROM quizzes WHERE ${conditions.join(" AND ")}`;

    try {
      const [results, fields] = await db.query(query);

      let quizzes = results.map((result) => {
        return new Quiz(result);
      });

      return quizzes;
    } catch (error) {
      throw error;
    }
  }

  static async whereFirst(criteria) {
    const conditions = Object.entries(criteria).map(
      ([column, value]) => `${column} = '${value}'`
    );

    const query = `SELECT * FROM quizzes WHERE ${conditions.join(" AND ")}`;

    try {
      const [results, fields] = await db.query(query);

      let quizzes = results.map((result) => {
        return new Quiz(result);
      });

      return quizzes[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(data) {
    let query = `INSERT INTO quizzes SET ?`;

    let payload = {
      ...data,
      updated_at: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
    };

    try {
      let [result, fields] = await db.query(query, payload);

      return await Quiz.find(result.insertId);
    } catch (error) {
      throw error;
    }
  }

  async update(data) {
    let payload = [
      data.room_code || this.room_code,
      data.title || this.title,
      data.description || this.description,
      data.difficulty || this.difficulty,
      moment().utc().format("YYYY-MM-DD HH:mm:ss"),
    ];

    let query = `
        UPDATE rooms SET room_code = ?, title = ?, description = ?, difficulty = ?, updated_at = ? WHERE code = ${this.id}
        `;

    try {
      let [results, fields] = await db.query(query, payload);

      return await Quiz.find(this.id);
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    let query = `DELETE FROM quizzes WHERE id = ${this.id}`;
    try {
      let [results, fields] = await db.query(query);

      return results;
    } catch (error) {
      throw error;
    }
  }

  async creator() {
    let query = `
        SELECT users.id, users.fullname, users.username, users.email, users.created_at, users.updated_at
        FROM users
        JOIN quizzes
        ON quizzes.user_id = users.id
        WHERE quizzes.id = ${this.id}
        `;

    try {
      let [results, fields] = await db.query(query);

      this._master = results[0];
      return results;
    } catch (error) {
      throw error;
    }
  }

  async participants() {
    let query = `
        SELECT users.id, users.fullname, users.username, users.email, users.created_at, users.updated_at
        FROM users
        JOIN quiz_participants
        ON quiz_participants.user_id = users.id
        JOIN quizzes
        ON quizzes.id = quiz_participants.quiz_id
        WHERE quiz_participants.quiz_id = ${this.id}
        `;

    try {
      let [results, fields] = await db.query(query);

      this._participants = results;
      return results;
    } catch (error) {
      throw error;
    }
  }

  async addParticipant(user_id) {
    if (!user_id) {
      throw new Error("user tidak boleh kosong");
    }

    const participants = await this.participants();

    const isExist = participants.find(
      (participant) => participant.id === user_id
    );

    if (isExist) {
      return "user sudah menjadi peserta kuis";
    }

    const values = [
      [user_id, this.code, moment().utc().format("YYYY-MM-DD HH:mm:ss")],
    ];

    const query = `INSERT INTO quiz_participants (user_id, quiz_id, updated_at) VALUES ?`;

    try {
      let [results, fields] = await db.query(query, [values]);

      return results;
    } catch (error) {
      throw error;
    }
  }

  async removeParticipant(user_id) {
    if (!user_id) {
      throw new Error("user tidak boleh kosong");
    }

    const query = `DELETE FROM quiz_participants WHERE quiz_id = ? AND user_id = ?`;

    try {
      let [results, fields] = await db.query(query, [this.id, user_id]);

      return results;
    } catch (error) {
      throw error;
    }
  }

  async room() {
    let query = `
        SELECT rooms.code, rooms.room_master, rooms.name, rooms.created_at, rooms.updated_at
        FROM rooms
        JOIN quizzes
        ON quizzes.room_code = rooms.code
        WHERE quizzes.id = ${this.id}
        `;

    try {
      let [results, fields] = await db.query(query);

      this._room = results[0];
      return results;
    } catch (error) {
      throw error;
    }
  }

  async questions() {
    let query = `
        SELECT * FROM questions
        WHERE quiz_id = ${this.id}
        `;

    try {
      let [results, fields] = await db.query(query);

      this._room = results;
      return results;
    } catch (error) {
      throw error;
    }
  }
}
