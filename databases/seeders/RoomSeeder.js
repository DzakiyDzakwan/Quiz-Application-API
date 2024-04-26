import Room from "../../app/models/Room.js";
import User from "../../app/models/User.js";

export default class RoomSeeder {
  static async run() {
    console.log(`Seeding RoomSeeder...`);

    let users = [
      {
        username: "buditjahyono02",
        rooms: ["Matematika Dasar", "Matematika Lanjutan"],
      },
      {
        username: "cacacantika03",
        rooms: ["Kecantikan"],
      },
    ];

    try {
      for (const user of users) {
        let u = await User.whereFirst({ username: user.username });

        if (u) {
          for (const room of user.rooms) {
            let payload = {
              room_master: u.id,
              name: room,
            };

            let new_room = await Room.whereFirst(payload);

            if (!new_room) {
              new_room = await Room.create(payload);
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
