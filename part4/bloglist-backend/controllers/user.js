const bcrypt = require('bcryptjs');
const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    author: 1,
    title: 1,
    url: 1,
  });
  res.json(users);
});

userRouter.post('/', async (req, res, next) => {
  const { username, password, name } = req.body;
  if (!username || username.length < 3) {
    return res.status(400).json({
      status: 'failed',
      message: 'invalid username',
    });
  }

  if (password < 3) {
    return res.status(400).json({
      status: 'failed',
      message: 'invalid password',
    });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const user = new User({ username, name, password: hashedPassword });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = userRouter;
