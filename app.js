var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');


var apiRouter = require('./routes/apis');
var fileRouter = require('./routes/uploadFile.js');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var logermiddware = require('./model/visitormiddleware');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logermiddware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.use("/img",express.static(path.join(__dirname, 'img')));
//app.use('/', apiRouter);
// app.use('/', indexRouter);
//app.use('/users', usersRouter);
//app.use("/file",fileRouter)
// catch 404 and forward to error handler


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
