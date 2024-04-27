import User from "../models/User.js";

export default class ProfileController {
  static async show(req, res) {
    try {
      let data = req.user;
      await data.rooms();
      await data.quizzes();

      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async update(req, res) {
    try {
      let user = req.user;

      let data = await user.update(req.body);

      return res.status(201).send({ message: "update success", data });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
}
