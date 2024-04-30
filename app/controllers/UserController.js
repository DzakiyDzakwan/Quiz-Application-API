import User from "../models/User.js";

export default class UserController {
  static async index(req, res) {
    try {
      let data = await User.all();

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async show(req, res) {
    try {
      let id = parseInt(req.params.id);
      let data = await User.findOrFail(id);

      await data.roles();
      await data.permissions();
      await data.rooms();
      await data.quizzes();

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async store(req, res) {
    try {
      let data = await User.create(req.body);

      return res
        .status(201)
        .send({ message: "berhasil menambahkan user", data });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async update(req, res) {
    try {
      let id = parseInt(req.params.id);
      let user = await User.findOrFail(id);

      let payload = {
        fullname: body.fullname,
        username: body.username,
      };

      let data = await user.update(req.body);

      return res
        .status(201)
        .send({ message: "berhasil memperbarui user", data });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async destroy(req, res) {
    try {
      let id = parseInt(req.params.id);
      let user = await User.findOrFail(id);

      let data = await user.delete();

      return res.status(200).send({ message: "berhasil menghapus user" });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async roles(req, res) {
    try {
      let id = parseInt(req.params.id);
      let user = await User.findOrFail(id);

      let data = await user.roles();

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async attachRole(req, res) {
    let id = parseInt(req.params.id);
    try {
      let user = await User.findOrFail(id);

      let data = await user.attachRoles(req.body.roles);

      return res
        .status(200)
        .send({ message: "berhasil menambahkan role user" });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async detachRole(req, res) {
    let id = parseInt(req.params.id);
    try {
      let user = await User.findOrFail(id);

      let data = await user.detachRoles(req.body.roles);

      console.log(user);
      return res.status(200).send({ message: "berhasil melepas role user" });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async permissions(req, res) {
    let id = parseInt(req.params.id);
    try {
      let user = await User.findOrFail(id);

      let data = await user.permissions();

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async attachPermission(req, res) {
    let id = parseInt(req.params.id);
    try {
      let user = await User.findOrFail(id);

      let data = user.attachPermissions(req.body.permissions);

      return res
        .status(200)
        .send({ message: "berhasil menambahkan permission user" });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async detachPermission(req, res) {
    let id = parseInt(req.params.id);
    try {
      let user = await User.findOrFail(id);

      let data = user.detachPermissions(req.body.permissions);

      return res
        .status(200)
        .send({ message: "berhasil melepas permission user" });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async rooms() {
    try {
      let id = parseInt(req.params.id);
      let user = await User.findOrFail(id);

      let data = await user.rooms();

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  static async quizzes() {
    try {
      let id = parseInt(req.params.id);
      let user = await User.findOrFail(id);

      let data = await user.quizzes();

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}
