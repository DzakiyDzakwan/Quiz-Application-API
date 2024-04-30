import can from "../../helpers/can.js";
import Attempt from "../models/Attempt.js";

export default class AttemptController {
  static async show(req, res) {
    if (!(await can(req.user, ["sudo", "super-attempt", "read-attempt"])))
      throw new Error("anda tidak memiliki hak akses untuk endpoint ini");

    try {
      let id = parseInt(req.params.id);

      let data = await Attempt.find(id);

      await data.quiz();
      await data.responses();

      return res.status(201).send(data);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
}
