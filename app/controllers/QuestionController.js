import can from "../../helpers/can.js";
import Answer from "../models/Answer.js";
import Question from "../models/Question.js";

export default class QuestionController {
  static async index(req, res) {
    if (!(await can(req.user, ["sudo", "super-question"]))) {
      return res
        .status(403)
        .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
    }

    try {
      let data = await Question.all();

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async show(req, res) {
    if (!(await can(req.user, ["sudo", "super-question", "read-question"])))
      throw new Error("anda tidak memiliki hak akses untuk endpoint ini");

    try {
      let id = parseInt(req.params.id);
      let data = await Question.findOrFail(id);

      if (data) {
        await data.quiz();
        await data.answers();
      }

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async update(req, res) {
    try {
      if (!(await can(req.user, ["sudo", "super-question", "update-question"])))
        throw new Error("anda tidak memiliki hak akses untuk endpoint ini");

      let id = parseInt(req.params.id);
      let question = await Question.findOrFail(id);

      let quiz = await question.quiz();
      let user = req.user;

      if (quiz.user_id !== user.id)
        return res.status(400).send({
          errors: "anda tidak memiliki hak akses terhadap pertanyaan ini ",
        });

      let data = await question.update(req.body);

      return res.status(201).send({ message: "update success", data });
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async softDestroy(req, res) {
    if (!(await can(req.user, ["sudo", "super-question", "delete-question"])))
      throw new Error("anda tidak memiliki hak akses untuk endpoint ini");

    try {
      let id = parseInt(req.params.id);
      let question = await Question.findOrFail(id);

      let quiz = await question.quiz();
      let user = req.user;

      if (quiz.user_id !== user.id)
        return res.status(400).send({
          errors: "anda tidak memiliki hak akses terhadap pertanyaan ini ",
        });

      let data = await question.softDelete();

      return res.status(200).send({ message: "soft delete success" });
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async destroy(req, res) {
    if (!(await can(req.user, ["sudo"])))
      throw new Error("anda tidak memiliki hak akses untuk endpoint ini");

    try {
      let id = parseInt(req.params.id);
      let question = await Question.findOrFail(id);

      let quiz = await question.quiz();
      let user = req.user;

      if (quiz.user_id !== user.id)
        return res.status(400).send({
          errors: "anda tidak memiliki hak akses terhadap pertanyaan ini ",
        });

      let data = await question.delete();

      return res.status(200).send({ message: "delete success" });
    } catch (error) {
      return res.status(400).send({ message: "Gagal" });
    }
  }

  static async addAnswer(req, res) {
    if (!(await can(req.user, ["sudo", "super-answer", "create-answer"])))
      throw new Error("anda tidak memiliki hak akses untuk endpoint ini");

    try {
      let id = parseInt(req.params.id);

      let question = await Question.findOrFail(id);

      let answers = await question.answers();

      if (answers.length >= 4)
        return res.status(403).send({
          errors:
            "jumlah jawaban untuk pertanyaan ini sudah mencapai batas maksimal",
        });

      let payload = {
        question_id: id,
        content: req.body.content,
        is_correct: req.body.is_correct,
      };

      let data = await Answer.create(payload);

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }
}
