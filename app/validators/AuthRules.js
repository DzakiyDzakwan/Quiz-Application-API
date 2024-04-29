import { body, validationResult } from "express-validator";
import User from "../models/User.js";

const registerRules = () => {
  return [
    body("fullname").notEmpty().withMessage("fullname tidak boleh kosong"),
    body("username")
      .notEmpty()
      .withMessage("username tidak boleh kosong")
      .custom(async (value) => {
        const user = await User.whereFirst({
          username: value,
        });

        if (user) {
          throw new Error("username sudah terdaftar");
        }
      }),
    body("email")
      .notEmpty()
      .withMessage("email tidak boleh kosong")
      .isEmail()
      .withMessage("format email salah")
      .custom(async (value) => {
        const user = await User.whereFirst({
          email: value,
        });

        if (user) {
          throw new Error("email sudah terdaftar");
        }
      }),
    body("password")
      .notEmpty()
      .withMessage("password tidak boleh kosong")
      .isLength({ min: 8 })
      .withMessage("password harus lebih dari 8 karakter"),
  ];
};

const loginRules = () => {
  return [
    body("username")
      .notEmpty()
      .withMessage("username tidak boleh kosong")
      .custom(async (value) => {
        const user = await User.whereFirst({
          username: value,
        });

        if (!user) {
          throw new Error("username tidak terdaftar");
        }
      }),
    body("password").notEmpty().withMessage("password tidak boleh kosong"),
  ];
};

export { registerRules, loginRules };
