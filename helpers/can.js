const can = async (user, permissions = []) => {
  return await user.hasPermissions(permissions);
};

export default can;
