import { Router } from "express";
import ProfileController from "../app/controllers/ProfileController.js";
import auth from "../app/middlewares/AuthMiddleware.js";

const router = Router();

router.use(auth);
router.get("/", ProfileController.show);
router.patch("/update", ProfileController.update);

export default router;
