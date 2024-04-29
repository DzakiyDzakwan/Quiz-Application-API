import { body } from "express-validator";
import Role from "../models/Role.js";

const store = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("name tidak boleh kosong")
      .custom(async (value) => {
        let role = await Role.whereFirst({ name: value });

        if (role) {
          throw new Error("nama role sudah tersedia");
        }
      }),
  ];
};

const update = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("name tidak boleh kosong")
      .custom(async (value) => {
        let role = await Role.whereFirst({ name: value });

        if (role) {
          throw new Error("nama role sudah tersedia");
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

export { store, update, attachPermission, detachPermission };
