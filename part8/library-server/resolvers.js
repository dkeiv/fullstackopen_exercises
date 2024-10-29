const Book = require('./models/book');
const Author = require('./models/author');

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, { author, genre }) => {
      let filter = {};
      if (author) filter = { ...filter, author };
      if (genre) filter = { ...filter, genre };
      return Book.find(filter);
    },
    allAuthors: async () => Author.find({}),
  },

  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args });
      await book.save();

      return book;
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args });
      await author.save();
      return author;
    },
    editAuthor: (root, { name, setBornTo }) => {
      let editAuthor = null;

      authors = authors.map(author => {
        if (author.name === name) {
          editAuthor = { ...author, born: setBornTo };
          return editAuthor;
        } else return author;
      });

      return editAuthor;
    },
  },

  // adding virtual properties
  Author: {
    bookCount: async root => {
      const books = await Book.find({ author: root._id });
    },
  },
};

module.exports = resolvers;
