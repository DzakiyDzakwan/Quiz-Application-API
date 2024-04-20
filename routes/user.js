import { Router } from "express";
import UserController from "../app/controllers/UserController.js";

const router = Router();

router.get("/test", UserController.test);

router.get("/", UserController.index);
router.get("/:id", UserController.show);
router.post("/", UserController.store);
router.put("/:id/update", UserController.update);
router.delete("/:id/delete", UserController.destroy);

router.get("/:id/roles", UserController.roles);
router.post("/:id/attach-roles", UserController.attachRole);
router.delete("/:id/detach-roles", UserController.detachRole);

router.get("/:id/permissions", UserController.permissions);
router.post("/:id/attach-permissions", UserController.attachPermission);
router.post("/:id/detach-permissions", UserController.detachPermission);

export default router;
