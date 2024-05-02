import jwt from "jsonwebtoken";
import User from "./../models/User.js";

const auth = (req, res, next) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ errors: "token tidak dapat ditemukan" });
  }

  jwt.verify(token, process.env.JWT_KEY, async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(403).send({ errors: "invalid token" });
    }

    try {
      const user = await User.findOrFail(result.user);
      await user.roles();
      await user.permissions();
      req.user = user;
    } catch (error) {
      res.status(500).send({ erros: error.message });
    }

    next();
  });
};

export default auth;
