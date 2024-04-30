import { Router } from "express";
import RoleController from "../app/controllers/RoleController.js";
import {
  store,
  update,
  attachPermission,
  detachPermission,
} from "../app/validators/RoleRules.js";
import auth from "../app/middlewares/AuthMiddleware.js";
import validate from "../app/validators/validate.js";
import sudo from "../app/middlewares/SuperMiddleware.js";

const router = Router();

router.use(auth, sudo);
router.get("/", RoleController.index);
router.get("/:id", RoleController.show);
router.post("/", store(), validate, RoleController.store);
router.put("/:id/update", update(), validate, RoleController.update);
router.delete("/:id/delete", RoleController.destroy);

router.get("/:id/users", RoleController.users);

router.get("/:id/permissions", RoleController.permissions);
router.post(
  "/:id/attach-permissions",
  attachPermission(),
  validate,
  RoleController.attachPermission
);
router.delete(
  "/:id/detach-permissions",
  detachPermission(),
  validate,
  RoleController.detachPermission
);

export default router;
