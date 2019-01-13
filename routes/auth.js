const expressPromiseRouter = require('express-promise-router')();
const Users = require('../controllers/users');
const { validateBody, schemas } = require('../helpers/routeHelpers')

expressPromiseRouter.post('/signup',validateBody(schemas.auth), Users.signup);

expressPromiseRouter.post('/login', validateBody(schemas.auth), Users.login);

expressPromiseRouter.post('/logout', (req, res, next) => { });


module.exports = expressPromiseRouter;