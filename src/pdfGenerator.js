const handlebars = require('handlebars');
const puppeteer = require('puppeteer');

const generatePDF = async (template, data) => {
  const compiledTemplate = handlebars.compile(template);
  const html = compiledTemplate(data);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();

  return pdfBuffer;
};

module.exports = { generatePDF };