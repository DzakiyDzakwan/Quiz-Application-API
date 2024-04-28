import Room from "../../app/models/Room.js";
import User from "../../app/models/User.js";
import QuizSeeder from "./QuizSeeder.js";

export default class RoomSeeder {
  static async run() {
    console.log(`Seeding RoomSeeder...`);

    let users = [
      {
        username: "buditjahyono02",
        rooms: [
          {
            name: "Kelas Matematika",
            quizzes: [
              {
                title: "Matematika Dasar",
                description: "Uji kemampuan matematika dasar Anda!",
                difficulty: "easy",
                time: "120",
                questions: [
                  {
                    question_order: 1,
                    content: "Berapakah jumlah dari 12 dan 18?",
                    answers: [
                      { content: "27", is_correct: false },
                      { content: "30", is_correct: true },
                      { content: "32", is_correct: false },
                      { content: "34", is_correct: false },
                    ],
                  },
                  {
                    question_order: 2,
                    content: "Berapakah hasil kali dari 5 dan 6?",
                    answers: [
                      { content: "25", is_correct: false },
                      { content: "30", is_correct: true },
                      { content: "35", is_correct: false },
                      { content: "40", is_correct: false },
                    ],
                  },
                  {
                    question_order: 3,
                    content: "Berapakah selisih antara 20 dan 8?",
                    answers: [
                      { content: "10", is_correct: false },
                      { content: "12", is_correct: true },
                      { content: "14", is_correct: false },
                      { content: "16", is_correct: false },
                    ],
                  },
                  {
                    question_order: 4,
                    content: "Berapakah hasil bagi dari 42 dibagi 7?",
                    answers: [
                      { content: "5", is_correct: false },
                      { content: "6", is_correct: true },
                      { content: "7", is_correct: false },
                      { content: "8", is_correct: false },
                    ],
                  },
                  {
                    question_order: 5,
                    content: "Berapakah akar pangkat dua dari 16?",
                    answers: [
                      { content: "2", is_correct: false },
                      { content: "3", is_correct: false },
                      { content: "4", is_correct: true },
                      { content: "5", is_correct: false },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        username: "cacacantika03",
        rooms: [
          {
            name: "Kelas XII IPA-5",
            quizzes: [],
          },
        ],
      },
    ];

    try {
      for (const user of users) {
        let _user = await User.whereFirst({ username: user.username });

        if (_user) {
          for (const room of user.rooms) {
            let data = {
              room_master: _user.id,
              name: room.name,
            };

            let _room = await Room.whereFirst(data);

            if (!_room) {
              _room = await Room.create(data);
            }

            for (let quiz of room.quizzes) {
              quiz = {
                ...quiz,
                room_code: _room.code,
              };

              await QuizSeeder.createQuiz(_user.id, quiz);
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
