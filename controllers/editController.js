const posts = require('../backend/models/editModel');

const getEdit = async (req, res) => {
    const { email } = req.query;
    console.log(email)
  
    try {
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const data = await posts.findOne({ email });

        if (!data) {
            return res.status(200).json(data);
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const postEdit = async (req, res) => {
    const { email, age, gender, country, religion } = req.body;

    try {
        // Validation
        if (!email || !age || !gender || !country || !religion) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await posts.postingedit(email, age, gender, country, religion);

        res.status(200).json({ email, age, gender, country, religion });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getEdit, postEdit };
