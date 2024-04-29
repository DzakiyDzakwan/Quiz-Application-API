import { Router } from "express";
import PermissionController from "../app/controllers/PermissionController.js";
import { store, update } from "../app/validators/PermissionRules.js";
import auth from "../app/middlewares/AuthMiddleware.js";
import validate from "../app/validators/validate.js";

const router = Router();

router.use(auth);
router.get("/", PermissionController.index);
router.get("/:id", PermissionController.show);
router.post("/", store(), validate, PermissionController.store);
router.put("/:id/update", update(), validate, PermissionController.update);
router.delete("/:id/delete", PermissionController.destroy);

router.get("/:id/users", PermissionController.users);
router.get("/:id/roles", PermissionController.roles);

export default router;
