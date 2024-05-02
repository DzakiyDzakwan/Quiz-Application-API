import { Router } from "express";
import auth from "../app/middlewares/AuthMiddleware.js";
import QuizController from "../app/controllers/QuizController.js";
import admin from "../app/middlewares/AdminMiddleware.js";
import isCreator from "../app/middlewares/QuizCreatorMiddleware.js";
import { store, update, addQuestion } from "../app/validators/QuizRules.js";
import validate from "../app/validators/validate.js";

const router = Router();

router.get(/public/, QuizController.public);

router.use(auth);
router.get("/", admin, QuizController.index);
router.get("/:id", QuizController.show);

router.post("/", store(), validate, QuizController.store);
router.put("/:id/update", isCreator, update(), validate, QuizController.update);
router.delete("/:id/delete", isCreator, QuizController.destroy);

router.get("/:id/questions", QuizController.questions);
router.post(
  "/:id/add-question",
  isCreator,
  addQuestion(),
  validate,
  QuizController.addQuestion
);

router.get("/:id/my-attempts", QuizController.profileAttempt);
router.get("/:id/attempts", isCreator, QuizController.attempts);
router.get("/:id/leaderboard", QuizController.leaderboard);
router.post("/:id/attempt", QuizController.attempt);

export default router;
