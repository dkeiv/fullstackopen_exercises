const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, { author, genre }) => {
      let filter = {};
      if (author) {
        const searchAuthor = await Author.findOne({ name: author });
        filter = { ...filter, author: searchAuthor?._id };
      }
      if (genre) filter = { ...filter, genres: genre };
      return Book.find(filter).populate('author');
    },
    allAuthors: async () => Author.find({}),
    me: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Unauthorized');
      }

      const user = await User.findOne({ username: currentUser.username });

      return user;
    },
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Unauthorized');
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError(error.message);
        }
      }

      const book = new Book({ ...args, author: author._id });
      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError(error.message);
      }

      return book.populate('author');
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args });
      return author.save();
    },
    editAuthor: async (root, { name, setBornTo }, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('Unauthorized');
      }

      const author = await Author.findOne({ name });
      if (!author) {
        throw new GraphQLError('not found');
      }

      try {
        author.born = setBornTo;
        return author.save();
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });
      try {
        await user.save();
        return user;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    login: async (root, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user || password !== '123') {
        throw new GraphQLError('wrong credentials');
      }

      const userToken = {
        username,
        id: user._id,
      };

      return {
        token: jwt.sign(userToken, process.env.JWT_SECRET, {
          expiresIn: 1000 * 60 * 5,
        }),
        username: user.username,
        id: user._id,
      };
    },
  },

  // adding virtual properties
  Author: {
    bookCount: async root => {
      const books = await Book.find({ author: root._id });
      return books.length;
    },
  },
};

module.exports = resolvers;
