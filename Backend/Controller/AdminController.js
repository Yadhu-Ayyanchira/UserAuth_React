const User = require("../Model/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const AdminLogin = async (req, res) => {
    console.log('inner of admin');
  try {
    const { email, password } = req.body;
    const exists = await User.findOne({ email: email });

    if (exists) {
        const access = await bcrypt.compare(password,exists.password)
      if (access && exists.is_admin===true) {
        const token = jwt.sign({ adminId: exists._id }, "jwtSecret", {
          expiresIn: "1m",
        });
        return res
          .status(200)
          .json({
            admin: exists,
            token: token,
            message: "login",
            status: true,
          });
      } else {
        return res
          .status(404)
          .json({ alert: "Password is wrong", status: false });
      }
    } else {
      return res
        .status(201)
        .json({ alert: "No Account in this Email", status: false });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const userDatas = async (req, res) => {
  try {
    const data = await User.find({});
    if (data) {
      res.status(200).json({ status: true, data: data });
    } else {
      res.status(200).json({ status: false, data: data });
    }
  } catch (error) {
    console.log(error.message);
  }
};
const userDetails = async (req, res) => {
  try {
    console.log("FN : userDetails");
    const id = req.params.id;
    const details = await User.findOne({ _id: id });
    if (details) {
      res
        .status(200)
        .json({ status: true, user: details, message: "user found" });
    } else {
      res.status(200).json({ status: false, message: "user not found" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
const updateUser = async (req, res) => {
        console.log("in controller edit user");

  try {
    console.log("FN Update user");
    const { id, name, email, mobile } = req.body;
    await User.findOneAndUpdate(
      { _id: id },
      { $set: { name: name, email: email, mobile: mobile } },
      { new: true }
    ).then((response) => {
      res.json({ updated: true, data: response });
    });
  } catch (error) {
    console.log(error.message);
  }
};
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await User.deleteOne({ _id: id });
    if (deleted) {
      res.status(200).json({ deleted: true });
    } else {
      res.status(200).json({ deleted: false });
    }
  } catch (error) {
    console.log();
  }
};
const addUser = async (req, res) => {
  try {
    console.log("FN : Add user");
    const { name, email, mobile, password } = req.body;
    const exists = await User.findOne({ email: email });
    if (exists) {
      console.log("Email Already exists");
      return res
        .status(200)
        .json({ alert: "email Alredy exists", status: false });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name: name,
        email: email,
        mob: mobile,
        password: hashPassword,
        is_admin:false
      });
      const token = jwt.sign({ userId: newUser._id }, "jwtSecret", {
        expiresIn: "1m",
      });
      return res
        .status(200)
        .json({
          token: token,
          user: newUser,
          alert: "Registered",
          status: true,
        });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  AdminLogin,
  userDatas,
  userDetails,
  updateUser,
  deleteUser,
  addUser,
};