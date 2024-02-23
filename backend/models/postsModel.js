const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}, { timestamps: true })

postSchema.statics.creatingpost = async function(title, content, email) {

  
  const text = await this.create({ title, content, email })

  return text
}

module.exports = mongoose.model('Post', postSchema)