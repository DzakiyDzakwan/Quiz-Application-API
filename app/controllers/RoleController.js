import can from "../../helpers/can.js";
import Role from "../models/Role.js";

export default class RoleController {
  static async index(req, res) {
    if (!(await can(req.user, ["sudo", "super-role", "read-role"]))) {
      return res.status(403).send({
        errors: "anda tidak memiliki hak akses untuk endpoint ini",
      });
    }

    try {
      let data = await Role.all();

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send({
        errors: error.message,
      });
    }
  }

  static async show(req, res) {
    if (!(await can(req.user, ["sudo", "super-role", "read-role"]))) {
      return res.status(403).send({
        errors: "anda tidak memiliki hak akses untuk endpoint ini",
      });
    }

    try {
      let id = parseInt(req.params.id);
      let data = await Role.findOrFail(id);

      await data.users();
      await data.permissions();

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send({
        errors: error.message,
      });
    }
  }

  static async store(req, res) {
    if (!(await can(req.user, ["sudo", "super-role", "create-role"]))) {
      return res.status(403).send({
        errors: "anda tidak memiliki hak akses untuk endpoint ini",
      });
    }

    try {
      let data = await Role.create(req.body);

      return res.status(201).send({ message: "create success", data });
    } catch (error) {
      return res.status(400).send({
        errors: error.message,
      });
    }
  }

  static async update(req, res) {
    if (!(await can(req.user, ["sudo", "super-role", "update-role"]))) {
      return res.status(403).send({
        errors: "anda tidak memiliki hak akses untuk endpoint ini",
      });
    }

    try {
      let id = parseInt(req.params.id);
      let role = await Role.findOrFail(id);

      let data = await role.update(req.body);

      return res.status(201).send({ message: "update success", data });
    } catch (error) {
      return res.status(400).send({
        errors: error.message,
      });
    }
  }

  static async destroy(req, res) {
    if (!(await can(req.user, ["sudo", "super-role", "delete-role"]))) {
      return res.status(403).send({
        errors: "anda tidak memiliki hak akses untuk endpoint ini",
      });
    }

    try {
      let id = parseInt(req.params.id);
      let role = await Role.findOrFail(id);

      let data = await role.delete();

      return res.status(200).send({ message: "delete success" });
    } catch (error) {
      return res.status(400).send({
        errors: error.message,
      });
    }
  }

  static async users(req, res) {
    if (!(await can(req.user, ["sudo", "super-role", "read-role"]))) {
      return res.status(403).send({
        errors: "anda tidak memiliki hak akses untuk endpoint ini",
      });
    }

    try {
      let id = parseInt(req.params.id);
      let role = await Role.findOrFail(id);

      let data = await role.users();

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send({
        errors: error.message,
      });
    }
  }

  static async permissions(req, res) {
    if (!(await can(req.user, ["sudo", "super-role", "read-role"]))) {
      return res.status(403).send({
        errors: "anda tidak memiliki hak akses untuk endpoint ini",
      });
    }

    let id = parseInt(req.params.id);
    try {
      let role = await Role.findOrFail(id);

      if (role) {
        let data = await role.permissions();
        return res.status(200).send(data);
      }
    } catch (error) {
      return res.status(400).send({
        errors: error.message,
      });
    }
  }

  static async attachPermission(req, res) {
    if (!(await can(req.user, ["sudo", "super-role", "update-role"]))) {
      return res.status(403).send({
        errors: "anda tidak memiliki hak akses untuk endpoint ini",
      });
    }

    let id = parseInt(req.params.id);
    try {
      let role = await Role.findOrFail(id);

      let data = role.attachPermissions(req.body.permissions);

      return res.status(200).send({ message: "attach permissions success" });
    } catch (error) {
      return res.status(400).send({
        errors: error.message,
      });
    }
  }

  static async detachPermission(req, res) {
    if (!(await can(req.user, ["sudo", "super-role", "update-role"]))) {
      return res.status(403).send({
        errors: "anda tidak memiliki hak akses untuk endpoint ini",
      });
    }

    let id = parseInt(req.params.id);
    try {
      let role = await Role.findOrFail(id);

      let data = role.detachPermissions(req.body.permissions);
      return res.status(200).send({ message: "detach permissions success" });
    } catch (error) {
      return res.status(400).send({
        errors: error.message,
      });
    }
  }
}
