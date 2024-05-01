import Attempt from "../models/Attempt.js";

const isParticipant = async (req, res, next) => {
  try {
    let attempt = await Attempt.findOrFail(req.params.id);
    let user = req.user;

    if (attempt.user_id !== user.id) {
      return res.status(403).send({
        errors: "anda tidak memiliki hak akses terhadap percobaan ini",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({ errors: error.message });
  }
};

export default isParticipant;
