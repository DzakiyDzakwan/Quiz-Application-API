import User from "../../app/models/User.js";
import Quiz from "../../app/models/Quiz.js";
import Question from "../../app/models/Question.js";
import Answer from "../../app/models/Answer.js";

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
                question_order: 1,
                content: "What is the name of the spaceship in Star Wars?",
                answers: [
                  { content: "Enterprise", is_correct: false },
                  { content: "Millennium Falcon", is_correct: true },
                  { content: "Serenity", is_correct: false },
                  { content: "TARDIS", is_correct: false },
                ],
              },
              {
                question_order: 2,
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
                question_order: 3,
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
                question_order: 4,
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
                question_order: 5,
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
            await QuizSeeder.createQuiz(_user.id, quiz);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async createQuiz(user_id, quiz) {
    let data = {
      user_id: user_id,
      title: quiz.title,
      room_code: quiz.room_code,
      description: quiz.description,
      difficulty: quiz.difficulty,
    };

    let _quiz = await Quiz.whereFirst({
      user_id: user_id,
      title: quiz.title,
    });

    if (!_quiz) {
      _quiz = await Quiz.create(data);
    } else {
      _quiz = await Quiz.update(data);
    }

    for (const question of quiz.questions) {
      await QuizSeeder.createQuestion(_quiz.id, question);
    }
  }

  static async createQuestion(quiz_id, question) {
    let data = {
      quiz_id: quiz_id,
      question_order: question.question_order,
      content: question.content,
    };

    let _question = await Question.whereFirst({
      quiz_id: quiz_id,
      question_order: question.question_order,
    });

    if (!_question) {
      _question = await Question.create(data);
    } else {
      _question = await _question.update(data);
    }

    for (const answer of question.answers) {
      await QuizSeeder.createAnswer(_question.id, answer);
    }
  }

  static async createAnswer(question_id, answer) {
    let data = {
      question_id: question_id,
      content: answer.content,
      is_correct: answer.is_correct,
    };

    let _answer = await Answer.create(data);
  }
}
