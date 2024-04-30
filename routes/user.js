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
import admin from "../app/middlewares/AdminMiddleware.js";
import sudo from "../app/middlewares/SuperMiddleware.js";

const router = Router();
router.use(auth);
router.get("/", admin, UserController.index);
router.get(/inactive/, admin, UserController.trash);
router.get("/:id", admin, UserController.show);

router.use(sudo);
router.post("/", store(), validate, UserController.store);
router.put("/:id/update", update(), validate, UserController.update);
router.delete("/:id/delete", UserController.softdelete);
router.delete("/:id/destroy", UserController.destroy);

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
