(function () {
    'use strict';
    // Configs do passport
    
    var credentials = require('./credentials'),
        GitHubStrategy = require('passport-github').Strategy,
        objectGitHubStrategy = {
            clientID: credentials.GITHUB_CLIENT_ID,
            clientSecret: credentials.GITHUB_CLIENT_SECRET,
            callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
        };

    module.exports = {
        load: function (passport) {
            
            passport.serializeUser(function (user, done) {
                done(null, user);
            });

            passport.deserializeUser(function (obj, done) {
                done(null, obj);
            });

            passport.use(new GitHubStrategy(
                objectGitHubStrategy, function (accessToken, refreshToken, profile, done) {
                    process.token = accessToken;
                    process.nextTick(function () {
                        return done(null, profile);
                    });
                })
            );
        }
    };
}());
