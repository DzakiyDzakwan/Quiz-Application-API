import Answer from "../models/Answer.js";
import Attempt from "../models/Attempt.js";
import Question from "../models/Question.js";
import Quiz from "../models/Quiz.js";
import Response from "../models/Response.js";

import moment from "moment";

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
      question_order: req.body.question_order,
      content: req.body.content,
    };

    try {
      let data = await Question.create(payload);

      for (const answer of req.body.answers) {
        let answer_payload = {
          question_id: data.id,
          ...answer,
        };

        await Answer.create(answer_payload);
      }

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

  static async submitQuiz(req, res) {
    try {
      const id = parseInt(req.params.id);

      const attempt = await Attempt.find(id);

      const quiz = await attempt.quiz();

      const questions = await quiz.questions();

      const point = 100 / questions.length;

      let score = 0;

      let responses = req.body.responses;

      for (const response of responses) {
        let response_payload = {
          attempt_id: attempt.id,
          ...response,
        };

        let _response = await Response.whereFirst({
          attempt_id: attempt.id,
          question_id: response.question_id,
        });

        if (!_response) {
          await Response.create(response_payload);
        } else {
          await _response.update(response_payload);
        }
      }

      responses = await attempt.responses();

      for (const response of responses) {
        if (response.is_correct) {
          score = score + point;
        }
      }

      await attempt.update({
        score: score,
        time_remaining: "0",
        finished_at: moment().utc().format("YYYY-MM-DD HH:mm:ss"),
      });

      return res.status(200).send({ message: "quiz submitted" });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
}
