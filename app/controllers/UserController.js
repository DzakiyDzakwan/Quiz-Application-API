import User from "../models/User.js";
import bcrypt from "bcrypt";
import can from "../../helpers/can.js";

export default class UserController {
  static async index(req, res) {
    try {
      if (!(await can(req.user, ["sudo", "super-user", "read-user"]))) {
        return res
          .status(403)
          .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
      }

      let data = await User.whereAll({ deleted_at: "null" });

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async trash(req, res) {
    try {
      if (!(await can(req.user, ["sudo", "super-user", "read-user"]))) {
        return res
          .status(403)
          .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
      }

      let data = await User.whereAll({ deleted_at: "notnull" });

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async show(req, res) {
    try {
      if (!(await can(req.user, ["sudo", "super-user", "read-user"]))) {
        return res
          .status(403)
          .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
      }

      let id = parseInt(req.params.id);

      let data = await User.findOrFail(id);

      await data.roles();
      await data.permissions();
      await data.rooms();
      await data.quizzes();
      await data.attempts();

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async store(req, res) {
    try {
      if (!(await can(req.user, ["sudo", "super-user", "create-user"]))) {
        return res
          .status(403)
          .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
      }

      let payload = {
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 8),
      };

      let data = await User.create(payload);

      return res
        .status(201)
        .send({ message: "berhasil menambahkan user", data });
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async update(req, res) {
    try {
      if (!(await can(req.user, ["sudo", "super-user", "update-user"]))) {
        return res
          .status(403)
          .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
      }

      let id = parseInt(req.params.id);
      let user = await User.findOrFail(id);

      let payload = {
        fullname: req.body.fullname,
        username: req.body.username,
      };

      let data = await user.update(payload);

      return res
        .status(201)
        .send({ message: "berhasil memperbarui user", data });
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async softdelete(req, res) {
    try {
      if (!(await can(req.user, ["sudo", "super-user", "delete-user"]))) {
        return res
          .status(403)
          .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
      }

      let id = parseInt(req.params.id);
      let user = await User.findOrFail(id);

      let data = await user.softDelete();

      return res.status(200).send({ message: "berhasil menghapus user" });
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async destroy(req, res) {
    try {
      if (!(await can(req.user, ["sudo", "super-user", "delete-user"]))) {
        return res
          .status(403)
          .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
      }

      let id = parseInt(req.params.id);
      let user = await User.findOrFail(id);

      let data = await user.delete();

      return res
        .status(204)
        .send({ message: "berhasil menghapus permanen user" });
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async roles(req, res) {
    try {
      if (!(await can(req.user, ["sudo", "super-user", "read-user"]))) {
        return res
          .status(403)
          .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
      }

      let id = parseInt(req.params.id);
      let user = await User.findOrFail(id);

      let data = await user.roles();

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async attachRole(req, res) {
    if (!(await can(req.user, ["sudo", "super-user", "update-user"]))) {
      return res
        .status(403)
        .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
    }

    let id = parseInt(req.params.id);
    try {
      let user = await User.findOrFail(id);

      let data = await user.attachRoles(req.body.roles);

      return res
        .status(200)
        .send({ message: "berhasil menambahkan role user" });
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async detachRole(req, res) {
    if (!(await can(req.user, ["sudo", "super-user", "update-user"]))) {
      return res
        .status(403)
        .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
    }

    let id = parseInt(req.params.id);
    try {
      let user = await User.findOrFail(id);

      let data = await user.detachRoles(req.body.roles);

      console.log(user);
      return res.status(200).send({ message: "berhasil melepas role user" });
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async permissions(req, res) {
    if (!(await can(req.user, ["sudo", "super-user", "read-user"]))) {
      return res
        .status(403)
        .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
    }

    let id = parseInt(req.params.id);
    try {
      let user = await User.findOrFail(id);

      let data = await user.permissions();

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async attachPermission(req, res) {
    if (!(await can(req.user, ["sudo", "super-user", "update-user"]))) {
      return res
        .status(403)
        .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
    }

    let id = parseInt(req.params.id);
    try {
      let user = await User.findOrFail(id);

      let data = user.attachPermissions(req.body.permissions);

      return res
        .status(200)
        .send({ message: "berhasil menambahkan permission user" });
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async detachPermission(req, res) {
    if (!(await can(req.user, ["sudo", "super-user", "update-user"]))) {
      return res
        .status(403)
        .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
    }

    let id = parseInt(req.params.id);
    try {
      let user = await User.findOrFail(id);

      let data = user.detachPermissions(req.body.permissions);

      return res
        .status(200)
        .send({ message: "berhasil melepas permission user" });
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async rooms() {
    if (!(await can(req.user, ["sudo", "super-user", "read-user"]))) {
      return res
        .status(403)
        .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
    }

    try {
      let id = parseInt(req.params.id);
      let user = await User.findOrFail(id);

      let data = await user.rooms();

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async quizzes() {
    if (!(await can(req.user, ["sudo", "super-user", "read-user"]))) {
      return res
        .status(403)
        .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
    }

    try {
      let id = parseInt(req.params.id);
      let user = await User.findOrFail(id);

      let data = await user.quizzes();

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }
}
