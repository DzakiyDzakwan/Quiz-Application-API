import { Router } from "express";
import QuestionController from "../app/controllers/QuestionController.js";
import auth from "../app/middlewares/AuthMiddleware.js";

const router = Router();

router.use(auth);
router.get("/:id", QuestionController.show);
router.put("/:id/update", QuestionController.update);
router.delete("/:id/soft-delete", QuestionController.softDestroy);
router.delete("/:id/delete", QuestionController.destroy);

export default router;
