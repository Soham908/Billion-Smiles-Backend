const express = require('express')
const { fetchCampaignsController } = require('../controllers/campaignController')
const router = express.Router()

// base route "/campaign"

router.get("/fetch-campaigns", fetchCampaignsController)

module.exports = router