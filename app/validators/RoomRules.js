import { body } from "express-validator";

const store = () => {
  return [body("name").notEmpty().withMessage("name tidak boleh kosong")];
};

const update = () => {
  return [body("name").notEmpty().withMessage("name tidak boleh kosong")];
};

const join = () => {
  return [
    body("room_code").notEmpty().withMessage("room_code tidak boleh kosong"),
  ];
};

const removeParticipant = () => {
  return [body("user_id").notEmpty().withMessage("user_id tidak boleh kosong")];
};

export { store, update, join, removeParticipant };
