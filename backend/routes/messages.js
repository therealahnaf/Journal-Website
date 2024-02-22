const express = require('express')

const { getMessages, postMessages } = require('../controllers/messagesController')

const router = express.Router()

router.get('/messages', getMessages)

router.post('/messages', postMessages)

module.exports = router