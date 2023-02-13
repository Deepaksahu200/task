const jwt = require("jsonwebtoken");
const User = require("../model/userModel");


const tokenCreate = async (id) => {
  // console.log(id);
  const token = await jwt.sign({ id }, process.env.JWT_SECRET);
  return token;
};

const adminAuthenticate = async (req, res, next) => {
  try {
    const token = req.header("token");

    if (!token) {
      return res.json({
        status: 400,
        message: "No authorization token is sent with request",
      });
    }
    const id = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id.id);
    if (user.userType === "admin") {
      req.user = user; // token

      return next();
    }
    return res.json({ status: 400, response: "Not a admin" });
  } catch (err) {
    res.json({ status: 400, Error: err.message });
  }
};

module.exports = {
  tokenCreate,
  adminAuthenticate,
};