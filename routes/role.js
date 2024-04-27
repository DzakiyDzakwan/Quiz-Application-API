import { Router } from "express";
import RoleController from "../app/controllers/RoleController.js";
import auth from "../app/middlewares/AuthMiddleware.js";

const router = Router();

router.use(auth);
router.get("/", RoleController.index);
router.get("/:id", RoleController.show);
router.post("/", RoleController.store);
router.put("/:id/update", RoleController.update);
router.delete("/:id/delete", RoleController.destroy);

router.get("/:id/users", RoleController.users);

router.get("/:id/permissions", RoleController.permissions);
router.post("/:id/attach-permissions", RoleController.attachPermission);
router.delete("/:id/detach-permissions", RoleController.detachPermission);

export default router;
