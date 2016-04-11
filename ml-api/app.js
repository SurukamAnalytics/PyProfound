/*
 * Module dependencies.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    errorHandler = require('error-handler'),
    morgan = require('morgan'),
    path = require('path'),
    api = require('./api');

var app = express();

// Configuration
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var env = process.env.NODE_ENV || 'development';
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//Send x-www-form-urlencoded post data
app.post('/ml-api/classify', api.classify);

// Start server
app.listen(8000, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

/*killall -9 node*/