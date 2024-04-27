import Room from "../models/Room.js";

export default class RoomController {
  static async index(req, res) {
    try {
      let data = await Room.all();

      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async show(req, res) {
    try {
      let data = await Room.find(req.params.code);

      await data.master();
      await data.participants();
      await data.quizzes();

      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async store(req, res) {
    let payload = {
      room_master: req.user.id,
      name: req.body.name,
    };

    try {
      let data = await Room.create(payload);

      return res.status(201).send({ message: "create success", data });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async update(req, res) {
    try {
      let room = await Room.find(req.params.code);

      let data = await room.update(req.body);

      return res.status(201).send({ message: "update success", data });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async destroy(req, res) {
    try {
      let room = await Room.find(req.params.code);

      let data = await room.delete();

      return res.status(200).send({ message: "delete success" });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async participants(req, res) {
    try {
      let room = await Room.find(req.params.code);

      let data = await room.participants();

      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async join(req, res) {
    try {
      let room = await Room.find(req.body.room);

      let user = req.user;

      //   Get user_id from header
      let data = await room.addParticipant(user.id);

      return res.status(200).send({ message: "berhasil bergabung ke ruangan" });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async quit(req, res) {
    try {
      let room = await Room.find(req.params.code);

      let user = req.user;

      //   Get user_id from header
      let data = room.removeParticipant(req.user.id);

      return res.status(200).send({ message: "berhasil keluar ruangan" });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async removeParticipant(req, res) {
    try {
      let room = await Room.find(req.params.code);

      let data = room.removeParticipant(req.body.user);

      return res.status(200).send({ message: "berhasil menghapus peserta" });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async quizzes(req, res) {
    try {
      let room = await Room.find(req.params.code);

      let data = await room.quizzes();

      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
}
