import { Router } from "express";
import AuthController from "../app/controllers/AuthController.js";
import { registerRules, loginRules } from "../app/validators/AuthRules.js";
import validate from "../app/validators/validate.js";

const router = Router();

router.post("/register", registerRules(), validate, AuthController.register);

router.post("/login", loginRules(), validate, AuthController.login);

export default router;
