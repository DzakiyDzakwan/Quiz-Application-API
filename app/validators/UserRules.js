import { body } from "express-validator";
import User from "../models/User.js";

const store = () => {
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

const attachRole = () => {
  return [
    body("roles")
      .isArray()
      .withMessage("roles harus berupa array")
      .custom(async (value) => {
        if (value.length === 0) {
          throw new Error("roles tidak boleh kosong");
        }
      }),
  ];
};

const detachRole = () => {
  return [
    body("roles")
      .isArray()
      .withMessage("roles harus berupa array")
      .custom(async (value) => {
        if (value.length === 0) {
          throw new Error("roles tidak boleh kosong");
        }
      }),
  ];
};

const attachPermission = () => {
  return [
    body("permissions")
      .isArray()
      .withMessage("permissions harus berupa array")
      .custom(async (value) => {
        if (value.length === 0) {
          throw new Error("permissions tidak boleh kosong");
        }
      }),
  ];
};

const detachPermission = () => {
  return [
    body("permissions")
      .isArray()
      .withMessage("permissions harus berupa array")
      .custom(async (value) => {
        if (value.length === 0) {
          throw new Error("permissions tidak boleh kosong");
        }
      }),
  ];
};
export {
  store,
  update,
  attachRole,
  detachRole,
  attachPermission,
  detachPermission,
};
