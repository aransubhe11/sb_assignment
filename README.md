This project demonstrates a production-style backend built with Node.js, Apollo GraphQL, PostgreSQL (via Prisma), and additional features like JWT authentication, file uploads, email sending (Nodemailer), HTML → PDF generation, and Dockerized setup.

src/
 ├── index.js
 ├── schema/
 │    ├── typeDefs.js
 │    └── resolvers.js
 ├── config/
 │    ├── db.js
 │    ├── mailer.js
 │    └── env.js
 ├── middleware/
 │    └── auth.js
 ├── services/
 │    ├── userService.js
 │    ├── fileService.js
 │    ├── pdfService.js
 │    ├── emailService.js
 │    └── documentService.js
 ├── templates/
 │    ├── document.hbs
 │    └── email/
 │         └── document-ready.hbs
 ├── utils/
 │    └── jwt.js
 └── uploads/
      └── (uploaded files)
prisma/
 ├── schema.prisma
 └── migrations/
.env.sample
Dockerfile
docker-compose.yml
package.json
README.md


git clone https://github.com/aransubhe11/node-graphql-assessment.git
cd node-graphql-assessment

//.env

DATABASE_URL=postgresql://postgres:postgres@db:5432/appdb
JWT_SECRET=supersecret
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=ethereal-user
SMTP_PASS=ethereal-pass
UPLOAD_DIR=./uploads
PORT=4000


//run

docker-compose up --build


//Initialize the database

docker exec -it <app_container_name> npx prisma migrate dev --name init


//Endpoint

http://localhost:4000/graphql


//Register

mutation {
  register(email: "user@test.com", password: "secret", name: "John") {
    token
    user { id email }
  }
}


//Login

mutation {
  login(email: "user@test.com", password: "secret") {
    token
  }
}


//get User

query {
  me {
    id
    email
    name
  }
}


//Upload File


| Key        | Type | Value                                                                                                             |
| ---------- | ---- | ----------------------------------------------------------------------------------------------------------------- |
| operations | Text | `{"query": "mutation($file: Upload!) { uploadFile(file: $file) { filename url } }", "variables": {"file": null}}` |
| map        | Text | `{"0": ["variables.file"]}`                                                                                       |
| 0          | File | Choose file                                                                                                       |


//create pdf document

mutation {
  createDocument(title: "Report", templateData: { title: "Hello", content: "This is a PDF" }) {
    id
    title
    pdfUrl
  }
}

//send email with document

mutation {
  sendDocumentByEmail(documentId: 1, to: "test@example.com")
}


//Prisma Schema

generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "debian-openssl-3.0.x"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int       @id @default(autoincrement())
  email     String    @unique
  password  String
  name      String?
  documents Document[]
  files     FileMeta[]
}

model FileMeta {
  id        Int      @id @default(autoincrement())
  filename  String
  mimetype  String
  url       String
  userId    Int?
  user      User?    @relation(fields: [userId], references: [id])
}

model Document {
  id        Int      @id @default(autoincrement())
  title     String
  html      String
  pdfUrl    String
  userId    Int?
  user      User?    @relation(fields: [userId], references: [id])
}





