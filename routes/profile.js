import { Router } from "express";
import ProfileController from "../app/controllers/ProfileController.js";
import auth from "../app/middlewares/AuthMiddleware.js";

const router = Router();

router.use(auth);
router.get("/", ProfileController.show);
router.patch("/update", ProfileController.update);
router.get("/quizzes", ProfileController.quizzes);
router.get("/rooms", ProfileController.rooms);
router.get("/history", ProfileController.history);

export default router;
