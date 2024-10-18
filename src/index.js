require('dotenv').config();
const express = require('express');
const { generatePDF } = require('./pdfGenerator');
const { authenticateToken } = require('./middleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/generate-pdf', authenticateToken, async (req, res) => {
  try {
    const { template, data } = req.body;
    
    if (!template || !data) {
      return res.status(400).json({ error: 'Template and data are required' });
    }

    const pdfBuffer = await generatePDF(template, data);
    const base64PDF = pdfBuffer.toString('base64');

    res.json({ pdf: base64PDF });
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

app.listen(port, () => {
  console.log(`PDF Generation Microservice listening at http://localhost:${port}`);
});