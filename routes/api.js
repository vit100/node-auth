const expressPromiseRouter = require('express-promise-router')();
const passport = require('../passportConfig');

expressPromiseRouter.get('/secret', passport.authorize('myJWT',{session:false}),  async (req, res, next) => { res.send('secret api') });

module.exports = expressPromiseRouter;