import User from "./../../app/models/User.js";
import Role from "../../app/models/Role.js";
import Permission from "../../app/models/Permission.js";
import bcrypt from "bcrypt";

export default class UserSeeder {
  static async run() {
    console.log(`Seeding UserSeeder...`);

    let users = [
      {
        fullname: "Andi Gunawan",
        username: "andigunawan01",
        email: "andigunawan@gmail.com",
        password: "andi12345",
        roles: [{ name: "super" }, { name: "user" }],
        permissions: [],
      },
      {
        fullname: "Budi Tjahyono",
        username: "buditjahyono02",
        email: "budtjahyono@gmail.com",
        password: "budi12345",
        roles: [{ name: "admin" }, { name: "user" }],
        permissions: [],
      },
      {
        fullname: "Caca Cantika",
        username: "cacacantika03",
        email: "cacacantika@gmail.com",
        password: "caca12345",
        roles: [{ name: "user" }],
        permissions: [],
      },
      {
        fullname: "Didit Diamon",
        username: "diditdiamon04",
        email: "diditdiamon@gmail.com",
        password: "didit12345",
        roles: [{ name: "user" }],
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

        let new_user = await User.whereFirst({
          username: user.username,
          email: user.email,
        });

        if (!new_user) {
          new_user = await User.create(data);
        } else {
          new_user = await new_user.update(data);
        }

        for (const role of user.roles) {
          let r = await Role.whereFirst({ name: role.name });

          if (!r) {
            r = await Role.create(role);
          } else {
            r = await r.update(role);
          }

          new_user.attachRoles([r.id]);
        }

        for (const permission of user.permissions) {
          let p = await Permission.whereFirst({ name: permission.name });

          if (!p) {
            p = await Permission.create(permission);
          } else {
            p = await p.update(p);
          }

          new_user.attachPermissions([p.id]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
