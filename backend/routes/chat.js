const express = require('express')

const { getChat, postChat } = require('../controllers/chatController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get("/messages", getChat)

router.post("/messages", postChat)

module.exports = router