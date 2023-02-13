const User = require('../model/userModel')
const { genSalt, hash, compare } = require("bcrypt");
const { tokenCreate } = require("../middleware/index");
const userRegister = async (req, res, next) => {
  try {
    const {
      username,
      password,
  } = req.body;

  if (!username || !password) {
    return res.json({ Status: 400, message: "Missing values" });
  }
  //   if (userType === "admin") {
  //     return res.json({ Status: 400, message: "Oops Not allowed" });
  //   }

  const salt = await genSalt(8);
  const hashpassword = await hash(password, salt);
  // password = hashpassword;
  const userData = {
    username,
    userType:"customer",
    password: hashpassword,
};
let user = await User.create(userData);

let token = await tokenCreate(user._id);

res.json({
  status: 200,
  response: "User Created",
  user,
  token,
});
  } catch (err) {
  res.json({ status: 400, response: err.message });
}
};
const adminRegister = async (req, res, next) => {
  try {
    const {
      username,
      password,
  } = req.body;

  if (!username || !password) {
    return res.json({ Status: 400, message: "Missing values" });
  }
  //   if (userType === "admin") {
  //     return res.json({ Status: 400, message: "Oops Not allowed" });
  //   }

  const salt = await genSalt(8);
  const hashpassword = await hash(password, salt);
  // password = hashpassword;
  const userData = {
    username,
    userType:"admin",
    password: hashpassword,
};
let user = await User.create(userData);

let token = await tokenCreate(user._id);

res.json({
  status: 200,
  response: "User Created",
  user,
  token,
});
  } catch (err) {
  res.json({ status: 400, response: err.message });
}
};

const userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({username});
    console.log("user", user);
    if (!user) {
      return res.json({ status: 400, response: "user not found" });
    }
    console.log(user.password);
    const passwordCompare = await compare(password, user.password);
    if (!passwordCompare) {
      return res.json({ status: 400, response: "In Correct password " });
    }


    const token = await tokenCreate(user._id);
    res.json({ status: 200, response: " Logged Successful", user, token });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
const allUser = async (req, res, next) => {
  try {
    const user = await User.find();
    res.json({ status: 200, response: "all user", user });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
module.exports = { userRegister,adminRegister, userLogin,allUser }