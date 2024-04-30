import User from "./../../app/models/User.js";
import Role from "../../app/models/Role.js";
import Permission from "../../app/models/Permission.js";
import bcrypt from "bcrypt";

export default class UserSeeder {
  static async run() {
    console.log(`Seeding UserSeeder...`);

    let users = [
      {
        fullname: "Super Admin Test",
        username: "supertesting",
        email: "super@gmail.com",
        password: "super12345",
        roles: ["super"],
        permissions: [],
      },
      {
        fullname: "Admin Test",
        username: "admintesting01",
        email: "admintesting01@gmail.com",
        password: "admintest12345",
        roles: ["admin"],
        permissions: [],
      },
      {
        fullname: "User Testing 1",
        username: "usertesting01",
        email: "usertesting01@gmail.com",
        password: "usertest0112345",
        roles: ["user"],
        permissions: [],
      },
      {
        fullname: "User Testing 2",
        username: "usertesting02",
        email: "usertesting02@gmail.com",
        password: "usertest0212345",
        roles: ["user"],
        permissions: [],
      },
      {
        fullname: "User Testing 3",
        username: "usertesting03",
        email: "usertesting03@gmail.com",
        password: "usertest0312345",
        roles: ["user"],
        permissions: [],
      },
      {
        fullname: "User Testing 4",
        username: "usertesting04",
        email: "usertesting04@gmail.com",
        password: "usertest0412345",
        roles: ["user"],
        permissions: [],
      },
      {
        fullname: "User Testing 5",
        username: "usertesting05",
        email: "usertesting05@gmail.com",
        password: "usertest0512345",
        roles: ["user"],
        permissions: [],
      },
    ];

    try {
      for (const user of users) {
        let data = {
          fullname: user.fullname,
          username: user.username,
          email: user.email,
          password: await bcrypt.hash(user.password, 8),
        };

        let _user = await User.whereFirst({
          username: user.username,
          email: user.email,
        });

        if (!_user) {
          _user = await User.create(data);
        } else {
          _user = await _user.update(data);
        }

        for (const role of user.roles) {
          let _role = await Role.whereFirst({ name: role });

          if (!_role) {
            _role = await Role.create({ name: role });
          }

          _user.attachRoles([_role.id]);
        }

        for (const permission of user.permissions) {
          let _permission = await Permission.whereFirst({ name: permission });

          if (!_permission) {
            _permission = await Permission.create({ name: permission });
          }

          _user.attachPermissions([_permission.id]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
