import Quiz from "../models/Quiz.js";

const isCreator = async (req, res, next) => {
  try {
    let quiz = await Quiz.findOrFail(req.params.id);
    let user = req.user;

    let is_super = await user.hasRoles(["super"]);

    if (quiz.user_id !== user.id && !is_super) {
      return res.status(403).send({
        errors: "anda tidak memiliki hak akses terhadap kuis ini",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({ errors: error.message });
  }
};

export default isCreator;
