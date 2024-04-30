import Attempt from "../models/Attempt.js";
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
      return res.status(400).send({ errors: error.message });
    }
  }

  static async update(req, res) {
    try {
      let user = req.user;

      let data = await user.update(req.body);

      return res.status(201).send({ message: "update success", data });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ errors: error.message });
    }
  }

  static async rooms(req, res) {
    try {
      let user = req.user;

      let data = await user.rooms();

      return res.status(201).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ errors: error.message });
    }
  }

  static async quizzes(req, res) {
    try {
      let user = req.user;

      let data = await user.quizzes();

      return res.status(201).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ errors: error.message });
    }
  }

  static async history(req, res) {
    try {
      let user = req.user;

      let data = await Attempt.whereAll({
        user_id: this.id,
        finished_at: "notnull",
      });

      return res.status(201).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ errors: error.message });
    }
  }
}
