import { Router } from "express";
import RoleController from "../app/controllers/RoleController.js";

const router = Router();

router.get("/test", RoleController.test);

router.get("/", RoleController.index);
router.get("/:id", RoleController.show);
router.post("/", RoleController.store);
router.put("/:id/update", RoleController.update);
router.delete("/:id/delete", RoleController.destroy);

router.get("/:id/users", RoleController.users);

router.get("/:id/permissions", RoleController.permissions);
router.post("/:id/attach-permissions", RoleController.attachPermission);
router.post("/:id/detach-permissions", RoleController.detachPermission);

export default router;
