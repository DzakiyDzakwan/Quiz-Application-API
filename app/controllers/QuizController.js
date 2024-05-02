import can from "../../helpers/can.js";
import Answer from "../models/Answer.js";
import Attempt from "../models/Attempt.js";
import Question from "../models/Question.js";
import Quiz from "../models/Quiz.js";
import Response from "../models/Response.js";

import moment from "moment";

export default class QuizController {
  static async index(req, res) {
    if (!(await can(req.user, ["sudo", "super-quiz", "read-quiz"]))) {
      return res
        .status(403)
        .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
    }

    try {
      let data = await Quiz.all();

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async public(req, res) {
    if (!(await can(req.user, ["sudo", "super-quiz", "read-quiz"]))) {
      return res
        .status(403)
        .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
    }

    try {
      let data = await Quiz.whereAll({ room_code: "null" });

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async show(req, res) {
    if (!(await can(req.user, ["sudo", "super-quiz", "read-quiz"]))) {
      return res
        .status(403)
        .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
    }

    try {
      let id = parseInt(req.params.id);
      let data = await Quiz.findOrFail(id);

      let creator = await data.creator();
      let room = await data.room();
      let question = await data.questions();

      let user = req.user.id;

      if (room) {
        let room_participants = await room.participants();

        let is_participant = room_participants.find(
          (participant) => participant.id === user.id
        );

        let is_creator = creator.id === user.id;

        if (!is_participant && !is_creator)
          return res.status(403).send({
            errors: "kuis ini tidak terbuka untuk umum",
          });
      }

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async store(req, res) {
    if (!(await can(req.user, ["sudo", "super-quiz", "create-quiz"]))) {
      return res
        .status(403)
        .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
    }

    let payload = {
      user_id: req.user.id,
      ...req.body,
    };

    try {
      let data = await Quiz.create(payload);

      return res.status(201).send({ message: "create success", data });
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async update(req, res) {
    if (!(await can(req.user, ["sudo", "super-quiz", "update-quiz"]))) {
      return res
        .status(403)
        .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
    }

    try {
      let id = parseInt(req.params.id);
      let quiz = await Quiz.findOrFail(id);

      let data = await quiz.update(req.body);

      return res.status(201).send({ message: "update success", data });
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async destroy(req, res) {
    if (!(await can(req.user, ["sudo", "super-quiz", "delete-quiz"]))) {
      return res
        .status(403)
        .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
    }

    try {
      let id = parseInt(req.params.id);
      let quiz = await Quiz.findOrFail(id);

      let data = await quiz.delete();

      return res.status(200).send({ message: "delete success" });
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async questions(req, res) {
    if (!(await can(req.user, ["sudo", "super-question", "read-question"]))) {
      return res
        .status(403)
        .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
    }

    try {
      let id = parseInt(req.params.id);
      let quiz = await Quiz.findOrFail(id);

      let data = await quiz.questions();

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async addQuestion(req, res) {
    if (!(await can(req.user, ["sudo", "super-question", "create-question"]))) {
      return res
        .status(403)
        .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
    }

    let id = parseInt(req.params.id);

    let payload = {
      quiz_id: id,
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
      return res.status(400).send({ errors: error.message });
    }
  }

  static async profileAttempt(req, res) {
    let id = parseInt(req.params.id);

    try {
      let user = req.user;

      let quiz = await Quiz.findOrFail(id);

      let data = await Attempt.whereAll({ quiz_id: id, user_id: user.id });

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async attempts(req, res) {
    if (!(await can(req.user, ["sudo", "super-quiz", "read-quiz"]))) {
      return res
        .status(403)
        .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
    }

    let id = parseInt(req.params.id);

    try {
      let quiz = await Quiz.findOrFail(id);

      let data = await quiz.attempts();

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async leaderboard(req, res) {
    if (!(await can(req.user, ["sudo", "super-quiz", "read-quiz"]))) {
      return res
        .status(403)
        .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
    }

    let id = parseInt(req.params.id);

    try {
      let quiz = await Quiz.findOrFail(id);

      let data = await quiz.leaderboards();

      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }

  static async attempt(req, res) {
    if (!(await can(req.user, ["sudo", "super-attempt", "create-attempt"]))) {
      return res
        .status(403)
        .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
    }

    try {
      let id = parseInt(req.params.id);
      let user = req.user;
      let quiz = await Quiz.find(id);

      let room = await quiz.room();

      if (quiz.user_id === user.id)
        return res.status(403).send({
          errors:
            "anda tidak bisa melakukan percobaan terhadap kuis yang anda buat",
        });

      if (room) {
        let room_participants = await room.participants();

        let is_participant = room_participants.find(
          (participant) => participant.id === user.id
        );

        if (!is_participant)
          return res.status(403).send({
            errors:
              "anda tidak bisa melakukan pecobaan terhadap kuis, anda bukan bagian dari peserta kuis",
          });
      }

      let user_attempt = await Attempt.whereAll({
        user_id: user.id,
        quiz_id: quiz.id,
      });

      let ongoing_attempt = user_attempt.find(
        (attempt) => attempt.finished_at === null
      );

      if (user_attempt.lenght >= quiz.max_attempt)
        return res.status(403).send({
          errors: {
            message: "anda telah mencapai batas maksimal percobaan kuis.",
            max_attempt: quiz.max_attempt,
          },
        });

      if (ongoing_attempt)
        return res.status(403).send({
          errors: "selesaikan percobaan anda terlebih dahulu",
        });

      let payload = {
        quiz_id: quiz.id,
        user_id: req.user.id,
        time_remaining: quiz.time,
      };

      let data = await Attempt.create(payload);

      return res.status(201).send({ message: "attempt success" });
    } catch (error) {
      return res.status(400).send({ errors: error.message });
    }
  }
}
