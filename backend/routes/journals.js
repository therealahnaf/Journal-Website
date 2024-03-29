const express = require('express')
const {
  getJournals, 
  createJournal,
  getQuestion
} = require('../controllers/journalsController')

const requireAuth = require('../middleware/requireAuth')


const router = express.Router()



// GET all posts
router.get('/', getJournals)


router.post('/generateContent', getQuestion);


// POST new post
router.post('/', createJournal)

module.exports = router