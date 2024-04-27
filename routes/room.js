import { Router } from "express";
import RoomController from "../app/controllers/RoomController.js";
import auth from "../app/middlewares/AuthMiddleware.js";

const router = Router();

router.use(auth);
router.get("/", RoomController.index);
router.get("/:code", RoomController.show);
router.post("/", RoomController.store);
router.put("/:code/update", RoomController.update);
router.delete("/:code/delete", RoomController.destroy);

router.get("/:code/participants", RoomController.participants);
router.post("/join", RoomController.join);
router.delete("/:code/quit", RoomController.quit);
router.delete("/:code/remove-participant", RoomController.removeParticipant);

router.get("/:code/quizzes", RoomController.quizzes);

export default router;
