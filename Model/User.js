const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    profilePic: {
      type: String,
    },
    gender: {
      type: String,
    },
    age: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    attempt: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["client", "therapist", "admin"],
      required: true,
    },
  },
  { timestamps: true }
);

//static
userSchema.statics.SignUp = async function (
  firstName,
  lastName,
  email,
  password,
  role
) {
  if (!email || !password || !firstName || !lastName || !role) {
    throw Error("All inputs are required");
  }
  // if (!validator.isEmail(email)) {
  //   throw Error("Email is not valid");
  // }
  // if (!validator.isStrongPassword(password)) {
  //   throw Error("Password is not strong enough");
  // }
  // const exists = await this.findOne({ email });
  // if (exists) {
  //   throw Error("Email already in use!");
  // }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const users = await this.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });
  console.log("after");
  return users;
};

//Static LOgin Method
userSchema.statics.Login = async function (email, password) {
  if (!email || !password) {
    throw Error("All input is required!");
  }
  const user = await this.findOne({ email });

  if (user) {
    const match = await bcrypt.compare(password, user.password);
    console.log(match);
    if (!match) {
      throw Error("Incorrect email or password!");
    }
  } else {
    throw Error("Incorrect email or password!");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
