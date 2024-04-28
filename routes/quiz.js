import { Router } from "express";
import auth from "../app/middlewares/AuthMiddleware.js";
import QuizController from "../app/controllers/QuizController.js";

const router = Router();

router.use(auth);
router.get("/", QuizController.index);
router.get("/:id", QuizController.show);
router.post("/", QuizController.store);
router.put("/:id/update", QuizController.update);
router.delete("/:id/delete", QuizController.destroy);

router.get("/:id/questions", QuizController.questions);
router.post("/:id/add-question", QuizController.addQuestion);

router.get("/:id/leaderboard", QuizController.leaderboard);
router.post("/:id/attempt", QuizController.attemptQuiz);

export default router;
