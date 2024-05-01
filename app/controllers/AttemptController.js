import calculatePoint from "../../helpers/calculatePoint.js";
import can from "../../helpers/can.js";
import Answer from "../models/Answer.js";
import Attempt from "../models/Attempt.js";
import Question from "../models/Question.js";
import Response from "../models/Response.js";

import moment from "moment";

export default class AttemptController {
  static async show(req, res) {
    if (!(await can(req.user, ["sudo", "super-attempt", "read-attempt"])))
      throw new Error("anda tidak memiliki hak akses untuk endpoint ini");

    try {
      let id = parseInt(req.params.id);

      let data = await Attempt.findOrFail(id);

      await data.quiz();
      await data.responses();

      return res.status(201).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ errors: error.message });
    }
  }

  static async pause(req, res) {
    if (!(await can(req.user, ["sudo", "super-response", "create-response"]))) {
      return res
        .status(403)
        .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
    }

    try {
      const id = parseInt(req.params.id);

      const attempt = await Attempt.findOrFail(id);

      let responses = req.body.responses;

      for (const response of responses) {
        let check_question = await Question.whereFirst({
          id: response.question_id,
          quiz_id: attempt.quiz_id,
          deleted_at: "null",
        });

        let check_answer = await Answer.whereFirst({
          id: response.answer_id,
          question_id: response.question_id,
          deleted_at: "null",
        });

        if (check_question && check_answer) {
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
      }

      await attempt.update({
        time_remaining: req.body.time_remaining,
      });

      return res.status(200).send({ message: "success paused" });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ errors: error.message });
    }
  }

  static async submit(req, res) {
    if (!(await can(req.user, ["sudo", "super-response", "create-response"]))) {
      return res
        .status(403)
        .send({ errors: "anda tidak memiliki hak akses untuk endpoint ini" });
    }

    try {
      const id = parseInt(req.params.id);

      const attempt = await Attempt.findOrFail(id);

      let point = await calculatePoint(attempt.quiz_id);

      let score = 0;

      let responses = req.body.responses;

      for (const response of responses) {
        let check_question = Question.whereFirst({
          id: response.question_id,
          quiz_id: attempt.quiz_id,
          deleted_at: "null",
        });

        if (!check_question)
          return res
            .status(400)
            .send({ errors: "pertanyaan tidak dapat ditemukan" });

        let check_answer = Answer.whereFirst({
          id: response.answer_id,
          question_id: response.question_id,
          deleted_at: "null",
        });

        if (!check_answer)
          return res
            .status(400)
            .send({ errors: "jawaban tidak dapat ditemukan" });

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
        let answer = await Answer.find(response.answer_id);

        if (answer.is_correct) {
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
      return res.status(400).send({ errors: error.message });
    }
  }
}
