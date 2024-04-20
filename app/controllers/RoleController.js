import Role from "../models/Role.js";

export default class RoleController {
  static async index(req, res) {
    try {
      let data = await Role.all();

      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  static async show(req, res) {
    try {
      let id = parseInt(req.params.id);
      let data = await Role.find(id);

      await data.users();
      await data.permissions();

      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  static async store(req, res) {
    try {
      let data = await Role.create(req.body);

      res.status(201).send({ message: "create success", data });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  static async update(req, res) {
    try {
      let id = parseInt(req.params.id);
      let role = await Role.find(id);

      let data = await role.update(req.body);

      res.status(201).send({ message: "update success", data });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  static async destroy(req, res) {
    try {
      let id = parseInt(req.params.id);
      let role = await Role.find(id);

      let data = await role.delete();

      res.status(200).send({ message: "delete success" });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  static async users() {
    try {
      let id = parseInt(req.params.id);
      let role = await Role.find(id);

      let data = await role.users();

      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  static async permissions(req, res) {
    let id = parseInt(req.params.id);
    try {
      let role = await Role.find(id);

      let data = role.permissions();

      res.status(200).send(data);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  static async attachPermission(req, res) {
    let id = parseInt(req.params.id);
    try {
      let role = await Role.find(id);

      let data = role.attachPermissions(req.body);
      res.status(200).send({ message: "attach permissions success" });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  static async detachPermission(req, res) {
    let id = parseInt(req.params.id);
    try {
      let role = await Role.find(id);

      let data = role.detachPermissions(req.body);
      res.status(200).send({ message: "detach permissions success" });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  static async test(req, res) {
    try {
      let result = await Role.find({
        name: "super",
      });

      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }
}
