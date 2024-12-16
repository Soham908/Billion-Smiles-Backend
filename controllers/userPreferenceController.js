const userModel = require("../models/userModel");


exports.saveUserPreferencesFunc = async (req, res) => {
    const { username, causePreferences } = req.body;
    console.log("cause pref " + causePreferences + " : " + username);
    
    try {
      const savePreferRequest = await userModel.findOneAndUpdate(
        { username },
        { userCausePreferences: causePreferences },
        { new: true }
      );
  
      if (!savePreferRequest) {
        return res.status(404).json({ message: "User not found", success: false });
      }
      console.log("user found");
      
      res.json({ success: true, message: "user preference saved", savePreferRequest });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", success: false });
    }
  };

exports.fetchUserPreferenceFunc = async (req, res) => {

}