import Room from "../models/Room.js";

const isRoomMaster = async (req, res, next) => {
  let room = await Room.findOrFail(req.params.code);
  let user = req.user;
  let is_super = await user.hasRoles(["super"]);

  if (room.room_master !== user.id || !is_super) {
    return res.status(403).send({
      errors: "anda tidak memiliki hak akses terhadap ruangan ini",
    });
  }
};

export default isRoomMaster;
