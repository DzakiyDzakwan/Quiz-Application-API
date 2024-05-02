import Permission from "../../app/models/Permission.js";
import Quiz from "../../app/models/Quiz.js";

export default class AttemptSeeder {
  static async run() {
    let quiz = await Quiz.whereAll({ room_code: "null" });

    try {
    } catch (error) {
      console.log(error);
    }
  }
}
