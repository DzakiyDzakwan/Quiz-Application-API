import Permission from "../../app/models/Permission.js";

export default class RoleSeeder {
  static async run() {
    console.log(`Seeding PermissionSeeder...`);

    let permissions = [
      { name: "sudo", display_name: "Super User Permission" },

      { name: "super-user", display_name: "All User Endpoint" },
      { name: "read-user", display_name: "Read User Endpoint" },
      { name: "create-user", display_name: "Create User Endpoint" },
      { name: "update-user", display_name: "Update User Endpoint" },
      { name: "delete-user", display_name: "Delete User Endpoint" },

      { name: "super-role", display_name: "All Role Endpoint" },
      { name: "read-role", display_name: "Read Role Endpoint" },
      { name: "create-role", display_name: "Create Role Endpoint" },
      { name: "update-role", display_name: "Update Role Endpoint" },
      { name: "delete-role", display_name: "Delete Role Endpoint" },

      { name: "super-permission", display_name: "All Permission Endpoint" },
      { name: "read-permission", display_name: "Read Permission Endpoint" },
      {
        name: "create-permission",
        display_name: "Create Permission Endpoint",
      },
      {
        name: "update-permission",
        display_name: "Update Permission Endpoint",
      },
      {
        name: "delete-permission",
        display_name: "Delete Permission Endpoint",
      },

      { name: "super-room", display_name: "All Room Endpoint" },
      { name: "read-room", display_name: "Read Room Endpoint" },
      { name: "create-room", display_name: "Create Room Endpoint" },
      { name: "update-room", display_name: "Update Room Endpoint" },
      { name: "delete-room", display_name: "Delete Room Endpoint" },

      {
        name: "super-participant",
        display_name: "All Participant Endpoint",
      },
      {
        name: "read-participant",
        display_name: "Read Participant Endpoint",
      },
      {
        name: "create-participant",
        display_name: "Create Participant Endpoint",
      },
      {
        name: "update-participant",
        display_name: "Update Participant Endpoint",
      },
      {
        name: "delete-participant",
        display_name: "Delete Participant Endpoint",
      },

      { name: "super-quiz", display_name: "All Quiz Endpoint" },
      { name: "read-quiz", display_name: "Read Quiz Endpoint" },
      { name: "create-quiz", display_name: "Create Quiz Endpoint" },
      { name: "update-quiz", display_name: "Update Quiz Endpoint" },
      { name: "delete-quiz", display_name: "Delete Quiz Endpoint" },

      { name: "super-question", display_name: "All Question Endpoint" },
      { name: "read-question", display_name: "Read Question Endpoint" },
      { name: "create-question", display_name: "Create Question Endpoint" },
      { name: "update-question", display_name: "Update Question Endpoint" },
      { name: "delete-question", display_name: "Delete Question Endpoint" },

      { name: "super-answer", display_name: "All Answer Endpoint" },
      { name: "read-answer", display_name: "Read Answer Endpoint" },
      { name: "create-answer", display_name: "Create Answer Endpoint" },
      { name: "update-answer", display_name: "Update Answer Endpoint" },
      { name: "delete-answer", display_name: "Delete Answer Endpoint" },

      { name: "super-attempt", display_name: "All Attempt Endpoint" },
      { name: "read-attempt", display_name: "Read Attempt Endpoint" },
      { name: "create-attempt", display_name: "Read Attempt Endpoint" },
      { name: "update-attempt", display_name: "Create Attempt Endpoint" },
      { name: "delete-attempt", display_name: "Create Attempt Endpoint" },

      { name: "super-response", display_name: "All Response Endpoint" },
      { name: "read-response", display_name: "Read Response" },
      { name: "create-response", display_name: "Read Response" },
      { name: "update-response", display_name: "Update Response" },
      { name: "delete-response", display_name: "Create Response" },
    ];

    try {
      for (const permission of permissions) {
        let data = {
          name: permission.name,
          display_name: permission.display_name,
        };

        let _permission = await Permission.whereFirst({
          name: permission.name,
        });

        if (!_permission) {
          _permission = await Permission.create(data);
        } else {
          _permission = await _permission.update(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
