// Just a sample

// Node modules
var express = require('express'),
    passport = require('passport'),
    GitHubStrategy = require('passport-github').Strategy,
    credentials = require('./credentials'),
    ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
    expressconfig = require('./expressconfig.js'),
    expresspassportroutes = require('./expresspassportroutes.js'),
    expressregularroutes = require('./expressregularroutes.js');

// Passport setup...
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});
passport.use(
    new GitHubStrategy({
        clientID: credentials.GITHUB_CLIENT_ID,
        clientSecret: credentials.GITHUB_CLIENT_SECRET,
        callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
    },
    function (accessToken, refreshToken, profile, done) {
        process.token = accessToken;
        process.nextTick(function () {
            return done(null, profile);
        });
    }
));

// App setup...
var app = express();
expressconfig.load(app, express, passport);
expresspassportroutes.load(app, passport);
expressregularroutes.load(app, ensureLoggedIn);

app.listen(3000, function () {
    console.log('Address 127.0.0.1:3000');
});
