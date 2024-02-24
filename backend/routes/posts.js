const express = require('express')
const {
  getPosts, 
  createPost,
  getPost
} = require('../controllers/postsController')

const router = express.Router()

// GET all posts
router.get('/', getPosts)

// POST new post
router.post('/', createPost)

// GET single post

router.get('/:id', getPost);

module.exports = router