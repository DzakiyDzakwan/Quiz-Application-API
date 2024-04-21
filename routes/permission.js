import { Router } from "express";
import PermissionController from "../app/controllers/PermissionController.js";

const router = Router();

router.get("/test", PermissionController.test);

router.get("/", PermissionController.index);
router.get("/:id", PermissionController.show);
router.post("/", PermissionController.store);
router.put("/:id/update", PermissionController.update);
router.delete("/:id/delete", PermissionController.destroy);

router.get("/:id/users", PermissionController.users);
router.get("/:id/roles", PermissionController.roles);

export default router;
