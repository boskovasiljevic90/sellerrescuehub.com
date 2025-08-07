require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { OpenAI } = require('openai');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Configure file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// File upload endpoint
app.post('/api/analyze', upload.single('file'), async (req, res) => {
  try {
    const { reportType, language } = req.body;
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Process the file with OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an expert Amazon seller consultant. Analyze the provided ${reportType} report and provide step-by-step solutions in ${language}.`
        },
        {
          role: 'user',
          content: `Here is my Amazon ${reportType} report: ${file.filename}. Provide actionable solutions.`
        }
      ],
      max_tokens: 2000
    });

    res.json({
      solutions: response.choices[0].message.content
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
});

// Stripe payment endpoint
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert Amazon seller consultant. Provide detailed, actionable advice based on the user\'s query.'
        },
        ...history,
        { role: 'user', content: message }
      ],
      max_tokens: 1000
    });

    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Chat processing failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));