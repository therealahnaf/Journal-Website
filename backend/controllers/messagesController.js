const messages = require('../models/messagesModel')

const getMessages = async (req, res) => {

    try {
        const messagedata = await messages.find().sort({timestamp: -1}).limit(7)
        messagedata.reverse();
        res.status(200).json(messagedata)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const postMessages = async (req, res) => {
    const {email, message} = req.body

    // create token

    try {
        const user = await messages.postingmessage(email, message)

        await messages.findOneAndDelete({}, { sort: { 'timestamp': 1 } });

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
module.exports = { getMessages, postMessages }