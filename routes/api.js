const expressPromiseRouter = require('express-promise-router')();

expressPromiseRouter.get('/secret',async (req,res,next)=>{res.send('secret api')});

module.exports = expressPromiseRouter;