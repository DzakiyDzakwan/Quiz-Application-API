import Question from "../app/models/Question.js";

const calculatePoint = async (quiz_id) => {
  const questions = await Question.whereAll({
    quiz_id: quiz_id,
    deleted_at: "null",
  });

  const point = 100 / questions.length;

  return point;
};

export default calculatePoint;
