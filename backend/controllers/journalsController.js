const journals = require('../models/journalsModel')

const getJournals = async (req, res) => {
    console.log(req.user);
    const { email } = req.query; // Use req.query.email to access the email query parameter

    try {
        const Journals = await journals.find({ email }).sort({ createdAt: -1 });
        res.status(200).json(Journals);
    } catch (error) {
        console.error('Error fetching journals:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createJournal = async (req, res) => {
    const {journalcontent, email} = req.body
    console.log(req.body)

    // create token

    try {
        console.log(journalcontent, email)
        const user = await journals.creatingjournal(journalcontent, email)

        res.status(200).json({journalcontent, email})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = { getJournals, createJournal}