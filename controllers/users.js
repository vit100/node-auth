async function signup(req, res, next) {
  console.log('signup');
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