import Permission from "./../models/Permission.js";

export default class PermissionController {
  static async index(req, res) {
    try {
      let data = await Permission.all();

      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async show(req, res) {
    try {
      let id = parseInt(req.params.id);
      let data = await Permission.find(id);

      await data.users();
      await data.roles();

      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async store(req, res) {
    try {
      let data = await Permission.create(req.body);

      return res.status(201).send({ message: "create success", data });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async update(req, res) {
    try {
      let id = parseInt(req.params.id);
      let permission = await Permission.find(id);

      let data = await permission.update(req.body);

      return res.status(201).send({ message: "update success", data });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async destroy(req, res) {
    try {
      let id = parseInt(req.params.id);
      let permission = await Permission.find(id);

      let data = await permission.delete();

      return res.status(200).send({ message: "delete success" });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async users(req, res) {
    try {
      let id = parseInt(req.params.id);
      let permission = await Permission.find(id);

      let data = await permission.users();

      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async roles(req, res) {
    let id = parseInt(req.params.id);
    try {
      let permission = await Permission.find(id);

      let data = await permission.roles();

      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
}
