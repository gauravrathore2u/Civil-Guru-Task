var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../model/userModel.js");

exports.getAllUsers = async (req, resp) => {
  try {
    const allUser = await userModel.find();
    return resp.json({ result: 1, data: allUser });
  } catch (error) {
    console.log(error.message);
    resp
      .status(500)
      .json({ result: -1, msg: "Internal server error", error: error.message });
  }
};

exports.userRegister = async (req, resp) => {
  try {
    let isUsrexist = await userModel.findOne({ email: req.body?.email });
    if (isUsrexist) {
      return resp.status(200).json({
        result: -1,
        message: "User already exists",
      });
    }
    let userId = await userModel.countDocuments();
    let token = jwt.sign({ email: req.body.email }, process.env.JWT_KEY);
    const hash = bcrypt.hashSync(
      req.body.password,
      parseInt(process.env.SALT_ROUND)
    );
    let newUser = {
      userId,
      name: req.body.name,
      email: req.body.email,
      password: hash,
      lastLogin: new Date(),
      token,
    };
    let user = await userModel.create(newUser);
    resp.status(200).json({
      result: 1,
      data: user,
    });
  } catch (error) {
    console.log(error);
    resp
      .status(500)
      .json({ result: -1, msg: "Internal server error", error: error.message });
  }
};

exports.login = async (req, resp) => {
  try {
    let isUsrexist = await userModel.findOne({ email: req.body?.email });
    let checkPass = bcrypt.compareSync(req.body.password, isUsrexist?.password);
    if (!isUsrexist || !checkPass) {
      return resp.status(200).json({
        result: -1,
        message: "Email or password is wrong", //we do not tell user which (email or password) is wrong
      });
    }
    resp.cookie("token", isUsrexist?.token);

    let updateLogin = await userModel.updateOne(
      { email: req.body.email },
      { $set: { lastLogin: new Date() } }
    );
    console.log(updateLogin);
    resp.status(200).json({ result: 1, data: isUsrexist });
  } catch (error) {
    console.log(error.message);
    resp
      .status(500)
      .json({ result: -1, msg: "Internal server error", error: error.message });
  }
};

exports.verifyToken = async (req, res) => {
  try {
    let token = req.body.token;
    let user = await userModel.findOne({ token });
    if (user) {
      return res.json({ result: 1, data: user });
    } else {
      return res.json({ result: 0, data: false });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ result: -1, msg: "Internal server error", error: error.message });
  }
};
