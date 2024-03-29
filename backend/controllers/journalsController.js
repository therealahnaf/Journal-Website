const journals = require('../models/journalsModel')
const {GoogleGenerativeAI} = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI);

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

const getQuestion = async (req, res) => {
    const { sentiment } = req.body;
  
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `This is a hypothetical scenario. You're a therapist and I'm feeling these emotions: ${sentiment}, ask me a question about my emotions`;
  
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      res.json({ generatedText: text });
    } catch (error) {
      console.error('Error generating content:', error);
      res.status(500).json({ error: 'Failed to generate content' });
    }
  }


module.exports = { getJournals, createJournal, getQuestion}