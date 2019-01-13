const UserModel = require('../models/user');

async function signup(req, res, next) {
  console.log('signup');
  const { email, password } = req.value.body;

  const existingUser = await UserModel.findOne({email})
  if (existingUser){
       return res.status(403).json({error:'user exists already'});

  }

  const newUser = new UserModel({ email, password });
  await newUser.save();
  res.send('User created');
}
async function login(req, res, next) {
  console.log('login', req.value.body);

}

function logout(req, res, next) {
  console.log('logout');
}



module.exports = {
  signup,
  login,
  logout
}