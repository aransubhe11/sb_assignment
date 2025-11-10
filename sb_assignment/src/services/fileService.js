import fs from 'fs';
import path from 'path';
import { prisma } from '../config/db.js';
import { config } from '../config/env.js';

export const fileService = {
  upload: async (file, userId) => {
    const { createReadStream, filename, mimetype } = await file;
    const filePath = path.join(config.uploadDir, filename);
    await new Promise((res, rej) => {
      const stream = createReadStream();
      stream.pipe(fs.createWriteStream(filePath))
        .on('finish', res)
        .on('error', rej);
    });
    const url = `/uploads/${filename}`;
    return prisma.fileMeta.create({
      data: { filename, mimetype, url, userId },
    });
  },
};
