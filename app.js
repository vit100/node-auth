require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');
const api = require('./routes/api');
const mongoose = require('mongoose');
const passport = require('./passportConfig.js');

mongoose.connect(process.env.MONGODB_CONNECTIONSTRING,
  {
    useNewUrlParser: true
  },
  (e)=>{
  if(e){
    console.error(e);
    return;
  }
  console.log('connected to mongoDB')
});

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/api', api)
app.use(passport.initialize()); 

app.listen(process.env.PORT || 3000, ()=>{console.log(`listening on port: ${process.env.PORT||3000}`)});
