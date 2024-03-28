const express = require('express')
const {
  getJournals, 
  createJournal
} = require('../controllers/journalsController')

const requireAuth = require('../middleware/requireAuth')


const router = express.Router()



// GET all posts
router.get('/', getJournals)

// POST new post
router.post('/', createJournal)

module.exports = router