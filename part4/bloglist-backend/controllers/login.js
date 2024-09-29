const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const isPasswordCorrect =
    user === null ? false : bcrypt.compareSync(password, user.password);

  if (!(user && isPasswordCorrect)) {
    return res.status(401).json({
      status: 'fail',
      message: 'incorrect username or password',
    });
  }

  const userToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userToken, process.env.SECRET, { expiresIn: 60 * 60 });

  res.status(200).json({
    token,
    username: user.username,
    name: user.name,
  });
});

module.exports = loginRouter;
