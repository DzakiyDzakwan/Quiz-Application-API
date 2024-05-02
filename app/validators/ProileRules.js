import { body } from "express-validator";
import User from "../models/User.js";

const update = () => {
  return [
    body("fullname").optional(),
    body("username")
      .optional()
      .custom(async (value) => {
        const user = await User.whereFirst({
          username: value,
        });

        if (user) {
          throw new Error("username sudah terdaftar");
        }
      }),
  ];
};

export { update };
