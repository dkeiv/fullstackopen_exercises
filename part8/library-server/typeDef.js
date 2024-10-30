const typeDefs = `
  type Author {
    _id: ID!
    name: String!
    born: Int
    bookCount: Int
  }

  type Book {
    _id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    _id: ID!
  }

  type Token {
    token: String!
    id: String!
    username: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User!
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`;

module.exports = typeDefs;
