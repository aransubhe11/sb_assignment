import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import { transporter } from '../config/mailer.js';

export const emailService = {
  async sendDocument(to, document) {
    const templatePath = path.resolve('src/templates/email/document-ready.hbs');
    const template = handlebars.compile(fs.readFileSync(templatePath, 'utf8'));
    const html = template({ title: document.title, pdfUrl: document.pdfUrl });

    const info = await transporter.sendMail({
      from: '"Docs Service" <no-reply@example.com>',
      to,
      subject: `Your document "${document.title}" is ready`,
      html,
      attachments: [
        { filename: `${document.title}.pdf`, path: `.${document.pdfUrl}` },
      ],
    });

    console.log('Email sent: ', info.messageId);
    return true;
  },
};
