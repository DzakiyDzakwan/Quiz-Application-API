import { Router } from "express";
import RoomController from "../app/controllers/RoomController.js";
import auth from "../app/middlewares/AuthMiddleware.js";
import isRoomMaster from "../app/middlewares/RoomMasterMiddleware.js";
import admin from "../app/middlewares/AdminMiddleware.js";
import validate from "../app/validators/validate.js";
import {
  store,
  update,
  join,
  removeParticipant,
} from "../app/validators/RoomRules.js";

const router = Router();

router.use(auth);

router.get("/", admin, RoomController.index);
router.get("/:code", RoomController.show);
router.post("/", store(), validate, RoomController.store);
router.put(
  "/:code/update",
  isRoomMaster,
  update(),
  validate,
  RoomController.update
);
router.delete("/:code/delete", isRoomMaster, RoomController.destroy);

router.get("/:code/participants", RoomController.participants);
router.post("/join", join(), validate, RoomController.join);
router.delete("/:code/quit", RoomController.quit);
router.delete(
  "/:code/remove-participant",
  isRoomMaster,
  removeParticipant(),
  validate,
  RoomController.removeParticipant
);

router.get("/:code/quizzes", RoomController.quizzes);
router.post("/:code/add-quiz", isRoomMaster, RoomController.addQuiz);

export default router;
