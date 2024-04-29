import QuizController from "../app/controllers/QuizController.js";
import AttemptController from "../app/controllers/AttemptController.js";
import { Router } from "express";
import auth from "./../app/middlewares/AuthMiddleware.js";

const router = Router();

router.use(auth);
router.get("/:id", AttemptController.show);
router.post("/:id/submit", QuizController.submitQuiz);

export default router;
