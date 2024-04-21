import User from "./../../app/models/User.js";
import Role from "../../app/models/Role.js";
import Permission from "../../app/models/Permission.js";

export default class UserSeeder {
  static async run() {
    let users = [
      {
        fullname: "Andi Pratama",
        username: "andipratama01",
        email: "andipratama@gmail.com",
        password: "andi12345",
        roles: [{ name: "super" }, { name: "user" }],
        permissions: [],
      },
      {
        fullname: "Budi Tjahyono",
        username: "budtjahyono02",
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
          password: user.password,
        };

        let new_user = await User.where(data);

        if (!new_user[0]) {
          new_user = await User.create(data);
        } else {
          new_user = new_user[0];
        }

        for (const role of user.roles) {
          let r = await Role.where(role);

          if (!r[0]) {
            r = await Role.create(role);
          } else {
            r = r[0];
          }

          new_user.attachRoles([r.id]);
        }

        for (const permission of user.permissions) {
          let p = await permission.where(permission);

          if (!p[0]) {
            p = await permission.create(permission);
          } else {
            p = p[0];
          }

          new_user.attachPermissions([p.id]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
