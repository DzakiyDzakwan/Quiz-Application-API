import { Router } from "express";
import UserRoute from "./user.js";
import RoleRoute from "./role.js";
import PermissionRoute from "./permission.js";
import AuthRoute from "./auth.js";
import RoomRoute from "./room.js";
import ProfileRoute from "./profile.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: "Hello World" });
});

router.use("/user", UserRoute);
router.use("/role", RoleRoute);
router.use("/permission", PermissionRoute);
router.use("/auth", AuthRoute);
router.use("/room", RoomRoute);
router.use("/profile", ProfileRoute);

export default router;
