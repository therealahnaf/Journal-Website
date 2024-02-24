const commentmodel = require('../models/commentsModel.js')


const newComment = async (req, res) => {
    // try {
    //     const comment = await new comment(request.body);
    //     comment.save();

    //     response.status(200).json('Comment saved successfully');
    // } catch (error) {
    //     response.status(500).json(error);
    // }
    const {email, postId, comment} = req.body
    console.log(email)

    // create token

    try {
        const user = await commentmodel.createComment(email, postId, comment)
        console.log(email, postId, comment)

        res.status(200).json({email, postId, comment})
    } catch (error) {
        // console.log(req.body)
        res.status(400).json({error: error.message})
    }
}


const getComments = async (request, response) => {
    try {
        const comments = await commentmodel.find({ postId: request.params.id });
        
        response.status(200).json(comments);
    } catch (error) {
        response.status(500).json(error)
    }
}

module.exports = { getComments, newComment }