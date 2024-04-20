import { Router } from "express";
import UserRoute from "./user.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: "Hello World" });
});

router.use("/user", UserRoute);

export default router;
