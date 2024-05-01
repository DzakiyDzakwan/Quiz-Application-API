import Room from "../models/Room.js";

const isRoomMaster = async (req, res, next) => {
  try {
    let room = await Room.findOrFail(req.params.code);
    let user = req.user;
    let is_super = await user.hasRoles(["super"]);

    if (room.room_master !== user.id && !is_super) {
      return res.status(403).send({
        errors: "anda tidak memiliki hak akses terhadap ruangan ini",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({ errors: error.message });
  }
};

export default isRoomMaster;
