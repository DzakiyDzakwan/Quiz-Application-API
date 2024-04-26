const randomString = (length = 9) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let string = "";
  for (let i = 0; i < length; i++) {
    string += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return string;
};

export default randomString;
