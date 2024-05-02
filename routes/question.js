import { Router } from "express";
import QuestionController from "../app/controllers/QuestionController.js";
import auth from "../app/middlewares/AuthMiddleware.js";
import { update, addAnswer } from "../app/validators/QuestionRules.js";
import validate from "../app/validators/validate.js";

const router = Router();

router.use(auth);
router.get("/:id", QuestionController.show);
router.post(
  "/:id/add-answer",
  addAnswer(),
  validate,
  QuestionController.addAnswer
);
router.put("/:id/update", update(), validate, QuestionController.update);
router.delete("/:id/delete", QuestionController.softDestroy);
router.delete("/:id/destroy", QuestionController.destroy);

export default router;
