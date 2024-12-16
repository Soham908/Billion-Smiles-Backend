
const express = require('express')
const { fetchUserPreferenceFunc, saveUserPreferencesFunc } = require('../controllers/userPreferenceController')
const router = express.Router()

router.patch("/save-preferences", saveUserPreferencesFunc)

router.get("/fetch-preference/:username", fetchUserPreferenceFunc)

module.exports = router