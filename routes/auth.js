const expressPromiseRouter = require('express-promise-router')();
const usersController = require('../controllers/users');
const { validateBody, schemas } = require('../helpers/routeHelpers');
const passport = require('../passportConfig');

expressPromiseRouter.post('/signup',
  validateBody(schemas.auth),
  usersController.signup);

expressPromiseRouter.post('/login',
  validateBody(schemas.auth),
  passport.authenticate("myLocalStrategy", { session: false }),
  usersController.login);

expressPromiseRouter.post('/logout', (req, res, next) => { });


module.exports = expressPromiseRouter;