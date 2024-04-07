const express = require('express')
const {
  getPosts, 
  createPost,
  getPost
} = require('../../controllers/postsController')

const {
  getComments, 
  newComment
} = require('../../controllers/commentsController')

const router = express.Router()

// GET all posts
router.get('/', getPosts)

// POST new post
router.post('/', createPost)

// GET single post

router.get('/:id', getPost);

router.post('/comments/new', newComment);
router.get('/comments/:id', getComments);

module.exports = router