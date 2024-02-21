const Chat = require('../models/chatModel')

const getChat = async (req, res) => {
    try {
        const messages = await Chat.find();
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
  }

const postChat = async (req, res) => {
    try {
        const { message } = req.body;
 
        if (!message) {
            return res
                .status(400)
                .json({ error: "Message required" });
        }
        
        const user_id = req.user._id
        const chatMessage = new Chat({
            user_id,
            message,
        });
 
        await chatMessage.save();
 
        res.status(201).json(chatMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}