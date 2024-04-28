import { Router } from "express";
import AnswerController from "../app/controllers/AnswerController.js";
import auth from "../app/middlewares/AuthMiddleware.js";

const router = Router();

router.use(auth);
router.get("/:id", AnswerController.show);
router.put("/:id/update", AnswerController.update);
router.delete("/:id/soft-delete", AnswerController.softDestroy);
router.delete("/:id/delete", AnswerController.destroy);

export default router;
