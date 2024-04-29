import { body } from "express-validator";
import Permission from "../models/Permission.js";

const store = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("name tidak boleh kosong")
      .custom(async (value) => {
        let permission = await Permission.whereFirst({ name: value });

        if (permission) {
          throw new Error("nama permussion sudah tersedia");
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
        let permission = await Permission.whereFirst({ name: value });

        if (permission) {
          throw new Error("nama permussion sudah tersedia");
        }
      }),
  ];
};

export { store, update };
