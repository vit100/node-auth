const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');
const api = require('./routes/api');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/api',api)

app.listen(process.env.PORT || 3000, ()=>{console.log(`listening on port: ${process.env.PORT||3000}`)});
