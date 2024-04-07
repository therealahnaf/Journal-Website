const posts = require('../backend/models/postsModel')

const getPosts = async (req, res) => {

    try {
        const postdata = await posts.find()
        postdata.reverse()

        res.status(200).json(postdata)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const createPost = async (req, res) => {
    const {postTitle, postContent, email} = req.body
    console.log(req.body)

    // create token

    try {
        const user = await posts.creatingpost(postTitle, postContent, email)

        res.status(200).json({postTitle, postContent, email})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getPost = async (req, res) => {
  const { id } = req.params
  console.log(id)

  try {
      const postdata = await posts.findById(id);

      res.status(200).json(postdata)
  } catch (error) {
      res.status(400).json({error: error.message})
  }
}

module.exports = { getPosts, createPost, getPost }