import { body } from "express-validator";
import Answer from "../models/Answer.js";

const update = () => {
  return [
    body("is_correct")
      .optional()
      .custom(async (value, { req }) => {
        console.log(value);
        return true;
      }),
  ];
};

export { update };
