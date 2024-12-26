const userModel = require("../models/userModel");


exports.saveUserPreferencesFunc = async (req, res) => {
    const { username, causePreferences } = req.body;    
    try {
      const savePreferRequest = await userModel.findOneAndUpdate(
        { username },
        { userCausePreferences: causePreferences },
        { new: true }
      );
  
      if (!savePreferRequest) {
        return res.status(404).json({ message: "User not found", success: false });
      }      
      res.json({ success: true, message: "user preference saved", savePreferRequest });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", success: false });
    }
  };

exports.fetchUserPreferenceFunc = async (req, res) => {

}