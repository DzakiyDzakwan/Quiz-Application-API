import User from "../models/User.js";

export default class UserController {
  static async index(req, res) {
    try {
      let data = await User.all();

      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async show(req, res) {
    try {
      let id = parseInt(req.params.id);
      let data = await User.find(id);

      await data.roles();
      await data.permissions();
      await data.rooms();
      await data.quizzes();

      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async store(req, res) {
    try {
      let data = await User.create(req.body);

      return res.status(201).send({ message: "create success", data });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async update(req, res) {
    try {
      let id = parseInt(req.params.id);
      let user = await User.find(id);

      let data = await user.update(req.body);

      return res.status(201).send({ message: "update success", data });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async destroy(req, res) {
    try {
      let id = parseInt(req.params.id);
      let user = await User.find(id);

      let data = await user.delete();

      return res.status(200).send({ message: "delete success" });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async roles(req, res) {
    try {
      let id = parseInt(req.params.id);
      let user = await User.find(id);

      let data = await user.roles();

      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async attachRole(req, res) {
    let id = parseInt(req.params.id);
    try {
      let user = await User.find(id);

      let data = await user.attachRoles(req.body.roles);
      console.log(user);
      return res.status(200).send({ message: "attach roles success", data });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async detachRole(req, res) {
    let id = parseInt(req.params.id);
    try {
      let user = await User.find(id);

      let data = await user.detachRoles(req.body.roles);

      console.log(user);
      return res.status(200).send({ message: "detach roles success" });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async permissions(req, res) {
    let id = parseInt(req.params.id);
    try {
      let user = await User.find(id);

      let data = await user.permissions();

      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async attachPermission(req, res) {
    let id = parseInt(req.params.id);
    try {
      let user = await User.find(id);

      let data = user.attachPermissions(req.body.permissions);

      return res.status(200).send({ message: "attach permissions success" });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async detachPermission(req, res) {
    let id = parseInt(req.params.id);
    try {
      let user = await User.find(id);

      let data = user.detachPermissions(req.body.permissions);

      return res.status(200).send({ message: "detach permissions success" });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async rooms() {
    try {
      let id = parseInt(req.params.id);
      let user = await User.find(id);

      let data = await user.rooms();

      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async quizzes() {
    try {
      let id = parseInt(req.params.id);
      let user = await User.find(id);

      let data = await user.quizzes();

      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
}
