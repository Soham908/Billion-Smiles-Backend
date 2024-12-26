const userModel = require("../models/userModel");

exports.authControllerLoginFunc = async (req, res) => {
  const incomingData = req.body;
  try {
    const loginRequest = await userModel.findOne({
      username: incomingData.username,
    });

    if (loginRequest.password === incomingData.password) {
      res.json({
        username: loginRequest.username,
        password: loginRequest.password,
        userPreferences: loginRequest.userCausePreferences,
        badgesEarned: loginRequest.badgesEarned,
        userId: loginRequest.id,
        success: true,
        message: "login done",
      });
    } else res.json({ success: false, message: "wrong user or password" });
  } catch (error) {
    console.log(error);
  }
  // if ( incomingData.username === loginRequest )
};

exports.authControllerSignupFunc = async (req, res) => {
  try {
    const checkUser = await userModel.findOne({ username: req.body.username });
    if (checkUser) {
      res.json({
        message: "user already exits",
        success: false,
      });
    } else {
      const register = await userModel.create({
        username: req.body.username,
        password: req.body.password,
        badgesEarned: ["Welcome Changemaker"],
      });
      console.log(register);

      res.json({
        success: true,
        message: "user registeration done",
        username: register.username,
        badgesEarned: register.badgesEarned,
        userId: register.id
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "error occured" + error,
    });
  }
};
