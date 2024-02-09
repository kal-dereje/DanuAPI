const VerificationModel = require("../Model/VerificationCode");

const getVerificationCode = async (req, res) => {
  try {
    const { email } = req.params;
    const verification = await VerificationModel.findOne({ email });

    res.status(200).json(verification);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getVerificationCode,
};
