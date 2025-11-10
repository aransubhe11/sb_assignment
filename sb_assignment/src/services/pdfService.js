import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import puppeteer from 'puppeteer';
import { config } from '../config/env.js';

export const pdfService = {
  async generateDocument(title, templateData) {
    const templatePath = path.resolve('src/templates/document.hbs');
    const template = handlebars.compile(fs.readFileSync(templatePath, 'utf8'));
    const html = template(templateData);

    const pdfPath = path.join(config.uploadDir, `${title}.pdf`);
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html);
    await page.pdf({ path: pdfPath, format: 'A4' });
    await browser.close();

    return { html, pdfUrl: `/uploads/${title}.pdf` };
  },
};
