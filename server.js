require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mongoose = require('mongoose');
const multer = require('multer');
const { Configuration, OpenAIApi } = require('openai');
const pdf = require('pdf-parse');
const XLSX = require('xlsx');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// MongoDB Models
const User = mongoose.model('User', new mongoose.Schema({
  email: String,
  password: String,
  stripeCustomerId: String,
  subscriptionStatus: String,
  freeScanUsed: Boolean
}));

const Report = mongoose.model('Report', new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  filename: String,
  originalName: String,
  mimeType: String,
  size: Number,
  analysisResult: String,
  createdAt: { type: Date, default: Date.now }
}));

// OpenAI Configuration
const openaiConfig = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(openaiConfig);

// File Upload Handling
const upload = multer({ storage: multer.memoryStorage() });

// Stripe Checkout Endpoint
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: req.body.priceId,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${process.env.DOMAIN}/success.html`,
      cancel_url: `${process.env.DOMAIN}/cancel.html`,
    });
    res.json({ id: session.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// File Upload Endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Convert file to text based on file type
    let text = '';
    if (req.file.mimetype === 'application/pdf') {
      const data = await pdf(req.file.buffer);
      text = data.text;
    } else if (req.file.mimetype.includes('spreadsheet') || 
               req.file.mimetype.includes('excel')) {
      const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
      text = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
    } else if (req.file.mimetype === 'text/csv') {
      text = req.file.buffer.toString();
    }

    // Analyze with OpenAI
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{
        role: 'system',
        content: 'You are an expert Amazon seller consultant. Analyze the provided report and provide step-by-step solutions in the user\'s preferred language.'
      }, {
        role: 'user',
        content: `Analyze this Amazon seller report and provide solutions:\n\n${text}`
      }]
    });

    // Save to database
    const report = new Report({
      userId: req.body.userId,
      filename: req.file.originalname,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      analysisResult: response.data.choices[0].message.content
    });
    await report.save();

    res.json({ success: true, analysis: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));