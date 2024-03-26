const express = require('express')

const {
    getEdit, 
    postEdit
  } = require('../controllers/editController')

const router = express.Router()

// GET all posts
router.get('/', getEdit)

// POST new post
router.post('/', postEdit)

module.exports = router