// Just a sample

// Node modules
var express = require('express'),
    passport = require('passport'),
    GitHubStrategy = require('passport-github').Strategy,
    ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
    https = require('https'),
    credentials = require('./credentials');

// App initial vars
var API_URL = 'https://api.github.com';

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
app.use(express.cookieParser());
app.use(express.session({secret: 'the secret'}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/github',
    passport.authenticate('github', {
        scope: ['notifications']
    })
);

app.get('/auth/github/callback',
    passport.authenticate('github', {
        successReturnToOrRedirect: '/account',
        failureRedirect: '/'
    })
);

app.get('/',
    function (req, res) {
        res.json({
            message: 'Hi, try access /auth/github :)'
        });
    }
);

app.get('/account',
    ensureLoggedIn('/'),
    function (req, res) {
        res.json({
            message: 'Hi <' + req.user._json.login + '>, try acess /notifications'
        });
    }
);

app.get('/notifications',
    ensureLoggedIn('/'),
    function (req, res) {
        
        var requisition,
            requestUrl = API_URL + '/notifications' + '?access_token=' + process.token;
        
        res.type('json');
        requisition = https.request(requestUrl, function (response) {
            response.on('data', function (chunk) {
                res.write(chunk);
            });
            response.on('end', function () {
                res.statusCode = 200; 
                res.end();
            });
        });
        requisition.end();
    }
);

app.listen(3000, function () {
    console.log('Address 127.0.0.1:3000');
});
