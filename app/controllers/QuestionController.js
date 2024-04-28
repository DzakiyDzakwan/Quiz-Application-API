import Question from "../models/Question.js";

export default class QuestionController {
  static async show(req, res) {
    try {
      let id = parseInt(req.params.id);
      let data = await Question.find(id);

      if (data) {
        await data.quiz();
        await data.answers();
      }

      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async update(req, res) {
    try {
      let id = parseInt(req.params.id);
      let question = await Question.find(id);

      let data = await question.update(req.body);

      return res.status(201).send({ message: "update success", data });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async softDestroy(req, res) {
    try {
      let id = parseInt(req.params.id);
      let question = await Question.find(id);

      let data = await question.softDelete();

      return res.status(200).send({ message: "soft delete success" });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async destroy(req, res) {
    try {
      let id = parseInt(req.params.id);
      let question = await Question.find(id);

      let data = await question.delete();

      return res.status(200).send({ message: "delete success" });
    } catch (error) {
      console.log(error);

      return res.status(400).send({ message: "Gagal" });
    }
  }
}
