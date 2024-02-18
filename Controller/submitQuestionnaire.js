const UserModel = require("../Model/User");
const ClientModel = require("../Model/Client");
const TherapistModel = require("../Model/Therapist");

//submit therapist quesionnaire
const SubmitTherapistQuesionnaire = async (req, res) => {
  const { phoneNumber, gender, age, speciality, availableDate, salary } =
    req.body;
  let { profilePic, cv } = req.files;

  profilePic = profilePic[0].originalname;
  cv = cv[0].originalname;

  console.log(profilePic, cv);

  try {
    res.status(200).json({ message: "sucess!" });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

//submit therapist quesionnaire
const SubmitClientQuesionnaire = async (req, res) => {
  const { phoneNumber, gender, age, speciality, gender_preference } = req.body;
  let { profilePic, cv } = req.files;

  profilePic = profilePic[0].originalname;
  cv = cv[0].originalname;

  console.log(profilePic, cv);

  try {
    res.status(200).json({ message: "sucess!" });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = { SubmitClientQuesionnaire, SubmitTherapistQuesionnaire };
