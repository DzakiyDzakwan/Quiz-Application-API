import Attempt from "../models/Attempt.js";
import Question from "../models/Question.js";
import Quiz from "../models/Quiz.js";

export default class QuizController {
  static async index(req, res) {
    try {
      let data = await Quiz.whereAll({ room_code: "null" });

      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async show(req, res) {
    try {
      let id = parseInt(req.params.id);
      let data = await Quiz.find(id);

      await data.creator();
      await data.room();
      await data.questions();

      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async store(req, res) {
    let payload = {
      user_id: req.user.id,
      ...req.body,
    };

    try {
      let data = await Quiz.create(payload);

      return res.status(201).send({ message: "create success", data });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async update(req, res) {
    try {
      let id = parseInt(req.params.id);
      let quiz = await Quiz.find(id);

      let data = await quiz.update(req.body);

      return res.status(201).send({ message: "update success", data });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async destroy(req, res) {
    try {
      let id = parseInt(req.params.id);
      let quiz = await Quiz.find(id);

      let data = await quiz.delete();

      return res.status(200).send({ message: "delete success" });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async questions(req, res) {
    try {
      let id = parseInt(req.params.id);
      let quiz = await Quiz.find(id);

      let data = await quiz.questions();

      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async addQuestion(req, res) {
    let quiz_id = parseInt(req.params.id);

    let payload = {
      quiz_id: quiz_id,
      ...req.body,
    };

    try {
      let data = await Question.create(payload);

      return res.status(201).send({ message: "create success", data });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async leaderboard(req, res) {
    let id = parseInt(req.params.id);

    try {
      let quiz = await Quiz.find(id);

      let data = await quiz.attempts();

      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  static async attemptQuiz(req, res) {
    try {
      let id = parseInt(req.params.id);
      let quiz = await Quiz.find(id);

      let payload = {
        quiz_id: quiz.id,
        user_id: req.user.id,
        time_remaining: quiz.time,
      };

      let data = await Attempt.create(payload);

      return res.status(201).send({ message: "attempt success" });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
}
