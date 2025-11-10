import { gql } from 'apollo-server';

export const typeDefs = gql`
  scalar Upload
  scalar JSON

  type User { id: ID!, email: String!, name: String }
  type AuthPayload { token: String!, user: User! }
  type FileMeta { id: ID!, filename: String!, mimetype: String!, url: String! }
  type Document { id: ID!, title: String!, html: String!, pdfUrl: String! }

  type Query {
    me: User
  }

  type Mutation {
    register(email: String!, password: String!, name: String): AuthPayload
    login(email: String!, password: String!): AuthPayload
    uploadFile(file: Upload!): FileMeta!
    createDocument(title: String!, templateData: JSON!): Document!
    sendDocumentByEmail(documentId: ID!, to: String!): Boolean!
  }
`;
