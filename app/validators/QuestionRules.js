import { body } from "express-validator";
import Question from "../models/Question.js";
import Answer from "../models/Answer.js";

const update = () => {
  return [
    body("question_order")
      .optional()
      .isInt()
      .withMessage("question_order harus berupa angka")
      .custom(async (value, { req }) => {
        let id = req.params.id;

        let question = await Question.find(id);

        let is_exist = await Question.whereFirst({
          quiz_id: question.quiz_id,
          question_order: value,
          deleted_at: "null",
        });

        if (is_exist) throw new Error(`question_order ${value} sudah tersedia`);

        return true;
      }),
  ];
};

const addAnswer = () => {
  return [
    body("is_correct").custom(async (value, { req }) => {
      let id = req.params.id;
      let question = await Question.findOrFail(id);

      let answers = await question.answers();

      let true_exist = answers.find((answer) => answer.is_correct === value);
      if (true_exist) throw new Error("hanya boleh satu jawaban yang benar");

      return true;
    }),
  ];
};

export { update, addAnswer };
