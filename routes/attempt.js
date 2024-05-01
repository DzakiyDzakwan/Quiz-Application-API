import AttemptController from "../app/controllers/AttemptController.js";
import { Router } from "express";
import auth from "./../app/middlewares/AuthMiddleware.js";
import isParticipant from "../app/middlewares/QuizParticipantMiddleware.js";

const router = Router();

router.use(auth);
router.get("/:id", AttemptController.show);
router.post("/:id/pause", isParticipant, AttemptController.pause);
router.post("/:id/submit", isParticipant, AttemptController.submit);

export default router;
