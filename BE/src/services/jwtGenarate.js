const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtGenarate = async (payload) => {
  const token = await jwt.sign(payload, process.env.KEY_JWT, {
    expiresIn: "7d",
  });
  return token;
};
const refreshToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.KEY_REFRESH_TOKEN, {
    expiresIn: "365d",
  });
  return token;
};
const newToken = async (token) => {
  try {
    const user = await jwt.verify(token, process.env.KEY_REFRESH_TOKEN);
    if (user) {
      const access_token = await jwtGenarate({
        id: user.id,
        isAdmin: user.isAdmin,
      });
      return access_token;
    } else {
      throw new Error("refresh_token invalid");
    }
  } catch (error) {
    console.log(error, "err");
  }
};
module.exports = { refreshToken, jwtGenarate, newToken };
