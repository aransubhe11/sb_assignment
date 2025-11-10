import { prisma } from '../config/db.js';
import { pdfService } from './pdfService.js';

export const documentService = {
  createDocument: async (title, data, userId) => {
    const { html, pdfUrl } = await pdfService.generateDocument(title, data);
    return prisma.document.create({
      data: { title, html, pdfUrl, userId },
    });
  },
};
