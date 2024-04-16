import User from "./../../app/models/User.js";

export default class UserSeeder {
  static async run() {
    let users = [
      {
        fullname: "Andi Pratama",
        username: "andipratama01",
        email: "andipratama@gmail.com",
        password: "andi12345",
      },
      {
        fullname: "Budi Tjahyono",
        username: "budtjahyono02",
        email: "budtjahyono@gmail.com",
        password: "budi12345",
      },
      {
        fullname: "Caca Cantika",
        username: "cacacantika03",
        email: "cacacantika@gmail.com",
        password: "caca12345",
      },
      {
        fullname: "Didit Diamon",
        username: "diditdiamon04",
        email: "diditdiamon@gmail.com",
        password: "didit12345",
      },
    ];

    try {
      for (const user of users) {
        await User.create(user); // Use `await` to wait for each creation
      }
    } catch (error) {
      console.log(error);
    }
  }
}
