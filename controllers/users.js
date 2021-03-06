const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

_signToken = userId => {
  const token = jwt.sign({
    "iat": new Date().getTime(),
  },
    process.env.JSONWEBTOKEN_SECRET,
    {
      issuer: "my server",
      subject: userId,
      expiresIn: '1 day'
    });
  return token;
}

async function signup(req, res, next) {
  console.log('signup');
  const { email, password } = req.value.body;

  const existingUser = await UserModel.findOne({ email })
  if (existingUser) {
    return res.status(403).json({ error: 'user exists already' });
  }

  const newUser = new UserModel({ email, password });
  var token = _signToken(newUser.id);

  await newUser.save();
  res.send({ token: token });
  return token;
}

async function login(req, res, next) {
  if (req.user) {
    return res.json({ "token": _signToken(req.user.id) });
  }
  return res.status(404).json({ "error": "can not login" });
}

function logout(req, res, next) {
  console.log('logout');
}

module.exports = {
  signup,
  login,
  logout,
}