import randomString from "../../helpers/randomString.js";
import db from "./../../config/connection.js";
import moment from "moment";
import User from "./User.js";
import Quiz from "./Quiz.js";

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
    const query = `SELECT * FROM rooms ORDER BY created_at`;

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
    let query = `SELECT * FROM rooms WHERE code = '${code}'`;

    try {
      const [results, fields] = await db.query(query);

      if (results[0]) {
        return new Room(results[0]);
      }

      return null;
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
    const conditions = Object.entries(criteria).map(([column, value]) => {
      if (value === "null") {
        return `${column} IS NULL`;
      } else if (value === "notnull") {
        return `${column} IS NOT NULL`;
      } else {
        return `${column} = '${value}'`;
      }
    });

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

      let room = await Room.all();

      return room[room.length - 1];
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
    UPDATE rooms SET room_master = ?, name = ?, updated_at = ? WHERE code = '${this.code}'
    `;

    try {
      let [results, fields] = await db.query(query, payload);

      return await Room.find(this.code);
    } catch (error) {
      throw error;
    }
  }

  async delete() {
    let query = `DELETE FROM rooms WHERE code = '${this.code}'`;
    try {
      let [results, fields] = await db.query(query);

      return results;
    } catch (error) {
      throw error;
    }
  }

  async master() {
    // let query = `
    // SELECT users.id, users.fullname, users.username, users.email, users.created_at, users.updated_at
    // FROM users
    // JOIN rooms
    // ON rooms.room_master = users.id
    // WHERE rooms.code = '${this.code}'
    // `;

    try {
      // let [results, fields] = await db.query(query);

      let _master = await User.find(this.room_master);

      this._master = _master;

      return _master;
    } catch (error) {
      throw error;
    }
  }

  async participants() {
    let query = `
    SELECT users.id, users.fullname, users.username, users.email, users.created_at, users.updated_at
    FROM users
    JOIN room_participants
    ON room_participants.user_id = users.id
    JOIN rooms
    ON rooms.code = room_participants.room_code
    WHERE room_participants.room_code = '${this.code}'
    `;

    try {
      let [results, fields] = await db.query(query);

      let _participants = [];

      for (const result of results) {
        let role = await Permission.find(result.id);
        _participants.push(role);
      }

      this._participants = _participants;

      return _participants;
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
      return "user sudah menjadi peserta ruangan";
    }

    const values = [
      [user_id, this.code, moment().utc().format("YYYY-MM-DD HH:mm:ss")],
    ];

    const query = `INSERT INTO room_participants (user_id, room_code, updated_at) VALUES ?`;

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

    const query = `DELETE FROM room_participants WHERE room_code = ? AND user_id = ?`;

    try {
      let [results, fields] = await db.query(query, [this.code, user_id]);

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
    WHERE rooms.code = '${this.code}'
    `;

    try {
      let [results, fields] = await db.query(query);

      let _quizzes = await Quiz.whereAll({ room_code: this.code });

      this._quizzes = _quizzes;

      return _quizzes;
    } catch (error) {
      throw error;
    }
  }
}
