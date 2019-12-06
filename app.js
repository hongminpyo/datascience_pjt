
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const router = express.Router();

require('dotenv').config()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


const upbitApi = require('./routes/upbitapi');
const csv = require('./routes/csv');
const getToken = require('./routes/getToken');
const aggregate = require('./routes/aggregate');


const app = express();

// node.js 의 native Promise 사용
mongoose.Promise = global.Promise;

console.log(process.env.MONGO_URI.concat(':',process.env.MONGO_PORT));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.get('/upbitapi', upbitApi.getInfo);
app.get('/csv', csv.getInfo);
app.get('/getToken', getToken.getInfo);
app.get('/aggregate', aggregate.getInfo);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connect(process.env.MONGO_URI.concat(':',process.env.MONGO_PORT.concat('/',process.env.MONGO_USER)), {useNewUrlParser: true}).then(
    ()=> console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e)
);


module.exports = app;
