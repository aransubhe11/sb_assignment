import { userService } from '../services/userService.js';
import { fileService } from '../services/fileService.js';
import { documentService } from '../services/documentService.js';
import { emailService } from '../services/emailService.js';
import { prisma } from '../config/db.js';

export const resolvers = {
  Query: {
    me: (_, __, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return prisma.user.findUnique({ where: { id: user.userId } });
    },
  },
  Mutation: {
    register: (_, args) => userService.register(args.email, args.password, args.name),
    login: (_, args) => userService.login(args.email, args.password),
    uploadFile: (_, { file }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return fileService.upload(file, user.userId);
    },
    createDocument: (_, { title, templateData }, { user }) => {
      if (!user) throw new Error('Not authenticated');
      return documentService.createDocument(title, templateData, user.userId);
    },
    sendDocumentByEmail: async (_, { documentId, to }) => {
      const doc = await prisma.document.findUnique({ where: { id: Number(documentId) } });
      if (!doc) throw new Error('Document not found');
      return emailService.sendDocument(to, doc);
    },
  },
};
