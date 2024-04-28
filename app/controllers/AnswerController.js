import Answer from "../models/Answer.js";

export default class AnswerController {
  static async show(req, res) {
    try {
      let id = parseInt(req.params.id);
      let data = await Answer.find(id);

      await data.question();

      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async update(req, res) {
    try {
      let id = parseInt(req.params.id);
      let answer = await Answer.find(id);

      let data = await answer.update(req.body);

      return res.status(201).send({ message: "update success", data });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async softDestroy(req, res) {
    try {
      let id = parseInt(req.params.id);
      let answer = await Answer.find(id);

      let data = await answer.softDelete();

      return res.status(200).send({ message: "soft delete success" });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async destroy(req, res) {
    try {
      let id = parseInt(req.params.id);
      let answer = await Answer.find(id);

      let data = await answer.delete();

      return res.status(200).send({ message: "delete success" });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
}
