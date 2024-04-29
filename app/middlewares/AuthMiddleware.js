import jwt from "jsonwebtoken";
import User from "./../models/User.js";

const auth = (req, res, next) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ message: "missing access token" });
  }

  jwt.verify(token, process.env.JWT_KEY, async (err, result) => {
    if (err) {
      return res.status(403).send({ message: "invalid token" });
    }

    const user = await User.find(result.user);
    await user.roles();
    await user.permissions();

    req.user = user;

    next();
  });
};

export default auth;
