const express = require('express')
const {
  getPosts, 
  createPost
} = require('../controllers/postsController')

const router = express.Router()

// GET all posts
router.get('/', getPosts)

// POST new post
router.post('/', createPost)

module.exports = router