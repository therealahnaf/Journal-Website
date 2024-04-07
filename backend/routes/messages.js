const express = require('express')

const { getMessages, postMessages } = require('../../controllers/messagesController')

const router = express.Router()

// const requireAuth = require('../middleware/requireAuth')

// router.use(requireAuth)

router.get('/messages', getMessages)

router.post('/messages', postMessages)

module.exports = router