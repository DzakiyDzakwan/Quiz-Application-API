import Room from "../../app/models/Room.js";
import User from "../../app/models/User.js";
import QuizSeeder from "./QuizSeeder.js";

export default class RoomSeeder {
  static async run() {
    console.log(`Seeding RoomSeeder...`);

    let users = [
      {
        username: "usertesting01",
        rooms: [
          {
            name: "Matematika 1-A",
            participants: ["usertesting05", "usertesting06"],
            quizzes: [
              {
                title: "Kuis Matematika 1",
                description: "Kuis matematika untuk penilaian kuis ke-1",
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
                  {
                    question_order: 6,
                    content:
                      "Persegi panjang memiliki panjang 10 cm dan lebar 5 cm. Hitunglah kelilingnya!",
                    answers: [
                      { content: "20 cm", is_correct: true },
                      { content: "25 cm", is_correct: false },
                      { content: "30 cm", is_correct: false },
                      { content: "35 cm", is_correct: false },
                    ],
                  },
                  {
                    question_order: 7,
                    content:
                      "Suatu bilangan bulat k dibagi 3 menghasilkan sisa 2. Jika k dibagi 4, berapakah sisanya?",
                    answers: [
                      { content: "0", is_correct: false },
                      { content: "1", is_correct: true },
                      { content: "2", is_correct: false },
                      { content: "3", is_correct: false },
                    ],
                  },
                  {
                    question_order: 8,
                    content: "Bentuk sederhana dari pecahan 25/75 adalah...",
                    answers: [
                      { content: "1/3", is_correct: true },
                      { content: "5/15", is_correct: false },
                      { content: "3/9", is_correct: false },
                      { content: "7/25", is_correct: false },
                    ],
                  },
                  {
                    question_order: 9,
                    content:
                      "Harga 1 buah buku adalah Rp. 5.000,-. Jika Andi membeli 3 buku, berapa uang yang harus dibayarkannya?",
                    answers: [
                      { content: "Rp. 10.000,-", is_correct: true },
                      { content: "Rp. 12.000,-", is_correct: false },
                      { content: "Rp. 15.000,-", is_correct: false },
                      { content: "Rp. 18.000,-", is_correct: false },
                    ],
                  },
                  {
                    question_order: 10,
                    content: "Your custom question content here",
                    answers: [
                      { content: "Answer choice 1", is_correct: false },
                      { content: "Answer choice 2", is_correct: true },
                      { content: "Answer choice 3", is_correct: false },
                      { content: "Answer choice 4", is_correct: false },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Matematika XII IPA 1",
            participants: ["usertesting07", "usertesting08", "usertesting09"],
            quizzes: [
              {
                title: "Matematika Lanjutan",
                description: "Uji kemampuan matematika lanjutan anda!",
                difficulty: "easy",
                time: "120",
                questions: [
                  {
                    question_order: 1,
                    content:
                      "Hitunglah turunan dari fungsi f(x) = x^2 + 2x - 3.",
                    answers: [
                      {
                        content: "2x + 3",
                        is_correct: false,
                      },
                      {
                        content: "x^2 + 2",
                        is_correct: true,
                      },
                      {
                        content: "2x - 3",
                        is_correct: false,
                      },
                      {
                        content: "x + 1",
                        is_correct: false,
                      },
                    ],
                  },
                  {
                    question_order: 2,
                    content:
                      "Selesaikan persamaan logaritmik: log (base 5) (x + 3) = 2",
                    answers: [
                      {
                        content: "x = 7",
                        is_correct: false,
                      },
                      {
                        content: "x = 22",
                        is_correct: true,
                      },
                      {
                        content: "x = 13",
                        is_correct: false,
                      },
                      {
                        content: "x = 4",
                        is_correct: false,
                      },
                    ],
                  },
                  {
                    question_order: 3,
                    content:
                      "Diketahui keliling suatu persegi panjang adalah 48 cm. Jika lebarnya 7 cm, hitunglah panjangnya!",
                    answers: [
                      {
                        content: "17 cm",
                        is_correct: true,
                      },
                      {
                        content: "12 cm",
                        is_correct: false,
                      },
                      {
                        content: "21 cm",
                        is_correct: false,
                      },
                      {
                        content: "24 cm",
                        is_correct: false,
                      },
                    ],
                  },
                  {
                    question_order: 4,
                    content:
                      "Misalkan a = 2 dan b = 5. Tentukan hasil dari (a + b)^2",
                    answers: [
                      {
                        content: "49",
                        is_correct: true,
                      },
                      {
                        content: "25",
                        is_correct: false,
                      },
                      {
                        content: "16",
                        is_correct: false,
                      },
                      {
                        content: "9",
                        is_correct: false,
                      },
                    ],
                  },
                  {
                    question_order: 5,
                    content:
                      "Suatu fungsi linear f(x) didefinisikan sebagai f(x) = 3x + 2. Hitunglah f(5)",
                    answers: [
                      {
                        content: "17",
                        is_correct: true,
                      },
                      {
                        content: "11",
                        is_correct: false,
                      },
                      {
                        content: "7",
                        is_correct: false,
                      },
                      {
                        content: "5",
                        is_correct: false,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        username: "usertesting02",
        rooms: [
          {
            name: "Ruangan Pelatihan Pendidikan Guru",
            participants: ["usertesting01"],
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

            for (const participant of room.participants) {
              let _participant = await User.whereFirst({
                username: participant,
              });

              let room_participants = await _room.participants();

              if (_participant) {
                let is_participant = room_participants.find(
                  (participant) => participant.id === _participant.id
                );

                if (is_participant) break;

                await _room.addParticipant(_participant.id);
              }
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
