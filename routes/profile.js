import { Router } from "express";
import ProfileController from "../app/controllers/ProfileController.js";
import auth from "../app/middlewares/AuthMiddleware.js";
import { update } from "../app/validators/ProileRules.js";
import validate from "../app/validators/validate.js";

const router = Router();

router.use(auth);
router.get("/", ProfileController.show);
router.patch("/update", update(), validate, ProfileController.update);
router.get("/quizzes", ProfileController.quizzes);
router.get("/rooms", ProfileController.rooms);
router.get("/history", ProfileController.history);

export default router;
