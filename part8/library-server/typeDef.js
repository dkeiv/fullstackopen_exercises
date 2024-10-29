const typeDefs = `
  type Author {
    ID: ID!
    name: String!
    born: Int
    bookCount: Int
  }

  type Book {
    ID: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ) : Book!
    addAuthor(
      name : String!
      born : Int
      ) : Author!
    editAuthor(name: String!, setBornTo: Int!) : Author
  }
`;

module.exports = typeDefs;
