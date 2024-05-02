import { body } from "express-validator";
import Question from "../models/Question.js";
import Answer from "../models/Answer.js";
import Room from "../models/Room.js";

const store = () => {
  return [
    body("room_code")
      .optional()
      .custom(async (value) => {
        if (value) {
          let room = await Room.findOrFail(value);
        }
        return true;
      }),
    body("title").notEmpty().withMessage("title tidak boleh kosong"),
    body("time")
      .optional()
      .custom((value) => {
        if (value) {
          let time_list = [30, 60, 90, 120, 150, 180];

          if (!time_list.includes(value))
            throw new Error(
              "time yang diperbolehkan 30 menit, 60 menit, 90 menit, 120 menit, 150 menit dan 180 menit"
            );
        }

        return true;
      }),
    body("max_attempt").optional(),
  ];
};

const update = () => {
  return [
    body("time")
      .optional()
      .custom((value) => {
        if (value) {
          let time_list = [30, 60, 90, 120, 150, 180];

          if (!time_list.includes(value))
            throw new Error(
              "time yang diperbolehkan 30 menit, 60 menit, 90 menit, 120 menit, 150 menit dan 180 menit"
            );
        }
        return true;
      }),
    body("max_attempt").optional(),
  ];
};

const addQuestion = () => {
  return [
    body("question_order")
      .notEmpty()
      .withMessage("question_order tidak boleh kosong")
      .isInt()
      .withMessage("question_order harus berupa angka")
      .custom(async (value, { req }) => {
        let quiz_id = req.params.id;

        let question = await Question.whereFirst({
          quiz_id: quiz_id,
          question_order: value,
          deleted_at: "null",
        });

        if (question) throw new Error(`question_order ${value} sudah tersedia`);

        return true;
      }),
    body("content").notEmpty().withMessage("content tidak boleh kosong"),
    body("answers")
      .optional()
      .isArray()
      .withMessage("answers harus berupa array dan tidak boleh kosong")
      .custom((answers) => {
        if (answers.length > 4)
          throw new Error("jumlah jawaban tidak boleh lebih dari 4");

        let correct_answer = answers.find((answer) => answer.is_correct);

        if (correct_answer)
          throw new Error("hanya boleh satu jawaban yang benar");

        return true;
      }),
  ];
};

export { store, update, addQuestion };
