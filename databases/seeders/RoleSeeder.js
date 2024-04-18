import Role from "./../../app/models/Role.js";

export default class RoleSeeder {
  static async run() {
    let roles = [
      {
        name: "super",
        display_name: "Super Administrator",
      },
      {
        name: "admin",
        display_name: "Administrator",
      },
      {
        name: "user",
        display_name: "User",
      },
    ];

    try {
      for (const role of roles) {
        await Role.create(role);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
