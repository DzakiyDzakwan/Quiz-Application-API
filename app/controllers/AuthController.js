import User from "./../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Role from "../models/Role.js";

export default class AuthController {
  static async login(req, res) {
    const { username, password } = req.body;

    try {
      let user = await User.whereFirst({ username: username });

      // Validasi Password
      let isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(404).send({
          errors: [
            {
              field: "password",
              message: "password yang anda masukan salah",
            },
          ],
        });
      }

      // Login
      const token = jwt.sign({ user: user.id }, process.env.JWT_KEY, {
        expiresIn: "12h",
      }); // (payload, secretkey, expiredTime)

      return res.status(200).send({ message: "login berhasil", token: token });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  static async register(req, res) {
    try {
      let payload = {
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 8),
      };

      let result = await User.create(payload);

      let role = await Role.whereFirst({ name: "user" });

      await result.attachRoles([role.id]);

      return res.status(201).send({ message: "Berhasil mendaftarkan akun" });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
}
