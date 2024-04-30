import Role from "./../../app/models/Role.js";
import Permission from "../../app/models/Permission.js";

export default class RoleSeeder {
  static async run() {
    console.log(`Seeding RoleSeeder...`);

    let roles = [
      {
        name: "super",
        display_name: "Super Administrator",
        permissions: ["sudo"],
      },
      {
        name: "admin",
        display_name: "Administrator",
        permissions: [
          "read-user",
          "read-room",
          "read-participant",
          "read-quiz",
          "read-question",
          "read-answer",
          "read-attempt",
          "read-response",
        ],
      },
      {
        name: "user",
        display_name: "User",
        permissions: [
          "super-room",
          "super-participant",
          "super-quiz",
          "super-question",
          "super-answer",
          "super-attempt",
          "super-response",
        ],
      },
    ];

    try {
      for (const role of roles) {
        let data = {
          name: role.name,
          display_name: role.display_name,
        };

        let _role = await Role.whereFirst({ name: data.name });

        if (!_role) {
          _role = await Role.create(data);
        } else {
          _role = await _role.update(data);
        }

        for (const permission of role.permissions) {
          let _permission = await Permission.whereFirst({ name: permission });

          if (!_permission) {
            _permission = await Permission.create({ name: permission });
          }

          _role.attachPermissions([_permission.id]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
