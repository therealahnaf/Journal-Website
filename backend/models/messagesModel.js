const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const messages = new Schema({
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
            type: Date,
            default: Date.now 
          }
});
messages.statics.postingmessage = async function(email, message) {

  
    const text = await this.create({ email, message })
  
    return text
  }
module.exports = mongoose.model('messages', messages)

