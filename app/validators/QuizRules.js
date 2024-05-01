import { body } from "express-validator";
import Question from "../models/Question.js";
import Answer from "../models/Answer.js";

const store = () => {
  return [
    body("title").notEmpty().withMessage("title tidak boleh kosong"),
    body("time")
      .optional()
      .isInt()
      .withMessage("time harus berupa angka")
      .custom((value) => {
        let time_list = ["30", "60", "90", "120", "150", "180"];

        if (!time_list.includes(value))
          throw new Error(
            "time yang diperbolehkan 30 menit, 60 menit, 90 menit, 120 menit, 150 menit dan 180 menit"
          );

        return true;
      }),
    body("max_attempt")
      .optional()
      .isInt()
      .withMessage("max_attempt harus berupa angka"),
  ];
};

const update = () => {
  return [
    body("time")
      .optional()
      .isInt()
      .withMessage("time harus berupa angka")
      .custom((value) => {
        let time_list = ["30", "60", "90", "120", "150", "180"];

        if (!time_list.includes(value))
          throw new Error(
            "time yang diperbolehkan 30 menit, 60 menit, 90 menit, 120 menit, 150 menit dan 180 menit"
          );

        return true;
      }),
    body("max_attempt")
      .optional()
      .isInt()
      .withMessage("max_attempt harus berupa angka"),
  ];
};

const addQuestion = () => {
  return [
    body("question_order")
      .isInt()
      .withMessage("question_order harus berupa angka")
      .custom(async (value, { req }) => {
        let quiz_id = req.params.id;

        let question = await Question.whereFirst({
          quiz_id: quiz_id,
          question_order: value,
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
        let correct_answer = answers.filter((answer) => answer.is_correct);

        if (correct_answer.length > 1)
          throw new Error("hanya boleh satu jawaban yang benar");

        return true;
      }),
  ];
};

export { store, update, addQuestion };
