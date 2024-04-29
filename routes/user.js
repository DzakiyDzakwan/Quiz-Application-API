import { Router } from "express";
import UserController from "../app/controllers/UserController.js";
import {
  attachPermission,
  attachRole,
  detachPermission,
  detachRole,
  store,
  update,
} from "./../app/validators/UserRules.js";
import auth from "../app/middlewares/AuthMiddleware.js";
import validate from "../app/validators/validate.js";

const router = Router();
router.use(auth);
router.get("/", UserController.index);
router.get("/:id", UserController.show);
router.post("/", store(), validate, UserController.store);
router.put("/:id/update", update(), validate, UserController.update);
router.delete("/:id/delete", UserController.destroy);

router.get("/:id/roles", UserController.roles);
router.post(
  "/:id/attach-roles",
  attachRole(),
  validate,
  UserController.attachRole
);
router.delete(
  "/:id/detach-roles",
  detachRole(),
  validate,
  UserController.detachRole
);

router.get("/:id/permissions", UserController.permissions);
router.post(
  "/:id/attach-permissions",
  attachPermission(),
  validate,
  UserController.attachPermission
);

router.delete(
  "/:id/detach-permissions",
  detachPermission(),
  validate,
  UserController.detachPermission
);

export default router;
