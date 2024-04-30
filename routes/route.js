import { Router } from "express";
import AuthRoute from "./auth.js";
import ProfileRoute from "./profile.js";
import UserRoute from "./user.js";
import RoleRoute from "./role.js";
import PermissionRoute from "./permission.js";
import RoomRoute from "./room.js";
import QuizRoute from "./quiz.js";
import QuestionRoute from "./question.js";
import AnswerRoute from "./answer.js";
import AttemptRoute from "./attempt.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: "Hello World" });
});

router.use("/auth", AuthRoute);
router.use("/profile", ProfileRoute);
router.use("/user", UserRoute);
router.use("/role", RoleRoute);
router.use("/permission", PermissionRoute);
router.use("/room", RoomRoute);
router.use("/quiz", QuizRoute);
router.use("/question", QuestionRoute);
router.use("/answer", AnswerRoute);
router.use("/attempt", AttemptRoute);

export default router;
