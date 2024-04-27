import User from "../../app/models/User.js";
import Quiz from "../../app/models/Quiz.js";

export default class QuizSeeder {
  static async run() {
    console.log(`Seeding QuizSeeder...`);

    let users = [
      {
        username: "andigunawan01",
        quizzes: [
          {
            title: "Movie Trivia",
            description: "Test your knowledge of classic films!",
            difficulty: "medium",
            questions: [
              {
                order: 1,
                content: "What is the name of the spaceship in Star Wars?",
                answers: [
                  { content: "Enterprise", is_correct: false },
                  { content: "Millennium Falcon", is_correct: true },
                  { content: "Serenity", is_correct: false },
                  { content: "TARDIS", is_correct: false },
                ],
              },
              {
                order: 2,
                content:
                  "Who directed the critically acclaimed film 'The Lord of the Rings' trilogy?",
                answers: [
                  { content: "Steven Spielberg", is_correct: false },
                  { content: "Peter Jackson", is_correct: true },
                  { content: "James Cameron", is_correct: false },
                  { content: "Quentin Tarantino", is_correct: false },
                ],
              },
              {
                order: 3,
                content:
                  "What is the name of the iconic white shark from the movie 'Jaws'?",
                answers: [
                  { content: "Bruce", is_correct: true },
                  { content: "Jaws", is_correct: false },
                  { content: "Great White", is_correct: false },
                  { content: "Orca", is_correct: false },
                ],
              },
              {
                order: 4,
                content:
                  "Which movie won the Academy Award for Best Picture in 2023?",
                answers: [
                  {
                    content: "Everything Everywhere All at Once",
                    is_correct: true,
                  },
                  { content: "Top Gun: Maverick", is_correct: false },
                  { content: "The Fabelmans", is_correct: false },
                  { content: "Elvis", is_correct: false },
                ],
              },
              {
                order: 5,
                content:
                  "In the movie 'The Godfather', what is the name of the family patriarch?",
                answers: [
                  { content: "Tony Soprano", is_correct: false },
                  { content: "Michael Corleone", is_correct: true },
                  { content: "Vito Corleone", is_correct: false },
                  { content: "Paulie Walnuts", is_correct: false },
                ],
              },
            ],
          },
        ],
      },
    ];

    try {
      for (const user of users) {
        let _user = await User.whereFirst({ username: user.username });

        if (_user) {
          for (const quiz of user.quizzes) {
            let quiz_data = {
              user_id: _user.id,
              title: quiz.title,
              description: quiz.description,
              difficulty: quiz.difficulty,
            };

            await QuizSeeder.createQuiz(quiz_data);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async createQuiz(quiz) {
    let _quiz = await Quiz.whereFirst({
      title: quiz.title,
      user_id: quiz.user_id,
    });

    if (!_quiz) {
      _quiz = await Quiz.create(quiz);
    } else {
      _quiz = await Quiz.update(quiz);
    }
  }
}
