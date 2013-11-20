// Just a sample

// Node modules
var express = require('express'),
    passport = require('passport'),
    GitHubStrategy = require('passport-github').Strategy,
    ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
    passportconfig = require('./passportconfig.js'),
    expressconfig = require('./expressconfig.js'),
    expresspassportroutes = require('./expresspassportroutes.js'),
    expressregularroutes = require('./expressregularroutes.js');

passportconfig.load(passport);

// App setup...
var app = express();
expressconfig.load(app, express, passport);
expresspassportroutes.load(app, passport);
expressregularroutes.load(app, ensureLoggedIn);

app.listen(3000, function () {
    console.log('Address 127.0.0.1:3000');
});
