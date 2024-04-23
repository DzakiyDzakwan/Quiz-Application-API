import User from "./../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default class AuthController {
  static async login(req, res) {
    const { username, password } = req.body;

    try {
      // Cek apakah username terdaftar
      let existsUser = await User.where({ username: username });

      if (existsUser < 1) {
        console.log(existsUser);
        return res
          .status(404)
          .send({ message: "username yang anda masukkan tidak terdaftar" });
      }

      existsUser = existsUser[0];

      // Validasi Password
      let isPasswordValid = await bcrypt.compare(password, existsUser.password);

      if (!isPasswordValid) {
        return res
          .status(404)
          .send({ message: "password yang anda masukkan salah" });
      }

      // Login
      const token = jwt.sign({ user: existsUser }, process.env.JWT_KEY, {
        expiresIn: "1h",
      }); // (payload, secretkey, expiredTime)

      return res.status(200).send({ message: "login berhasil", token: token });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  static async register(req, res) {
    try {
      // Check apakah username sudah terdaftar
      let username = await User.where({
        username: req.body.username,
      });

      if (username.length > 0) {
        return res
          .status(400)
          .send({ message: "username yang anda masukan sudah terdaftar" });
      }

      // Check apakah email sudah terdaftar

      let email = await User.where({
        username: req.body.email,
      });

      if (email.length > 0) {
        return res
          .status(400)
          .send({ message: "email yang anda masukan sudah terdaftar" });
      }

      let payload = {
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 8),
      };

      let result = await User.create(payload);

      return res.status(201).send({ message: "Berhasil mendaftarkan akun" });
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
