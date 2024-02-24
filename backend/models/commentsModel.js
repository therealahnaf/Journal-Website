const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    postId: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    }
});

CommentSchema.statics.createComment = async function(email, postId, comments) {

  
    const text = await this.create({ email, postId, comments })
  
    return text
  }

module.exports = mongoose.model('commentmodel', CommentSchema)
