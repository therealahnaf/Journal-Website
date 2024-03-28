const mongoose = require('mongoose')

const Schema = mongoose.Schema

const journalSchema = new Schema({
  journalcontent: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}, { timestamps: true })

journalSchema.statics.creatingjournal = async function(journalcontent, email) {

  console.log(journalcontent, email)
  const text = await this.create({ journalcontent, email })

  return text
}

module.exports = mongoose.model('Journal', journalSchema)