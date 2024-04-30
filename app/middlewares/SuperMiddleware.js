const sudo = async (req, res, next) => {
  let is_role = await req.user.hasRoles(["super"]);

  if (!is_role) {
    return res
      .status(403)
      .send({ message: "anda tidak memiliki akses ke endpoint ini" });
  }

  next();
};

export default sudo;
