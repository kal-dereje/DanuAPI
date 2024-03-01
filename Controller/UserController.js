const User = require("../Model/User");
const ClientModel = require("../Model/Client");
const TherapistModel = require("../Model/Therapist");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Token Generator
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//Sign Up
const UserCreate = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //const profilePic = req.file.filename;
    const exists = await User.findOne({ email });
    if (exists) {
      res.status(409).json({ message: "Email already in use!" });

      // throw Error("Email already in use!");
    } else {
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
      });
      user.save();

      // const user = await User.SignUp(
      //   firstName,
      //   lastName,
      //   email,
      //   password,
      //   // phoneNumber,
      //   // profilePic,
      //   // gender,
      //   // age,
      //   role
      // );

      res.status(201).json({ message: "Sucessfuly signed up!", user });
    }
  } catch (err) {
    res.status(422).json({ message: err });
  }
};

//Login
const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const users = await User.Login(email, password);
    const user = await User.findOne({ email });
    const token = createToken(users._id);
    if (user.role == "client") {
      const client = await ClientModel.findOne({ user: user._id });
      res
        .status(200)
        .json({ message: "sucess!", token: token, user: user, client: client });
    } else if (user.role == "therapist") {
      const therapist = await TherapistModel.findOne({
        user: user._id,
      }).populate("user");
      res.status(200).json({
        message: "sucess!",
        token: token,
        user: user,
        therapist: therapist,
      });
    } else {
      res.status(200).json({
        message: "sucess!",
        token: token,
        user: user,
      });
    }
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

//Get all
const GetUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
// Get one
const GetOneUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (user) {
      res.status(200).json({ message: "User found", user: user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedData = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
  // res.status(200).json({ message: "this is update" });
};

//Delete one
const DeleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

module.exports = {
  UserCreate,
  GetUser,
  GetOneUser,
  UpdateUser,
  DeleteUser,
  LoginUser,
};
