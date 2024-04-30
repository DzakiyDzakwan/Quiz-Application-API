const admin = async (req, res, next) => {
  let is_role = await req.user.hasRoles(["super", "admin"]);

  if (!is_role) {
    return res
      .status(403)
      .send({ message: "anda tidak memiliki hak akses untuk endpoint ini" });
  }

  next();
};

export default admin;
