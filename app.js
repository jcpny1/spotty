var createError   = require('http-errors');
var express       = require('express');
var request       = require('request'); // "Request" library
var path          = require('path');
var cors          = require('cors');
var querystring   = require('querystring');
var cookieParser  = require('cookie-parser');
var logger        = require('morgan');

var indexRouter   = require('./routes/index');
var apiRouter     = require('./routes/api');
var usersRouter   = require('./routes/users');

var client_id     = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';


app.use('/',     indexRouter);
app.use('/api',  apiRouter);
app.use('/users', usersRouter);

app.get('/login', function(req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-library-read user-read-private';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id:     client_id,
      scope:         scope,
      redirect_uri:  redirect_uri,
      show_dialog:   false,
      state:         state
    }));
});


app.post('/get_tokens', function(req, res) {
  const code = req.body.code;
  const redirect_uri = req.body.redirect_uri;

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      var access_token  = body.access_token,
          refresh_token = body.refresh_token,
          expires_in    = body.expires_in;

      res.json({
        'access_token':  access_token,
        'refresh_token': refresh_token,
        'expires_in':    expires_in,
      });
    } else {
      res.redirect('/#' +
        querystring.stringify({
          error: 'invalid_token'
        }));
    }
  });
});


// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})


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

module.exports = app;
