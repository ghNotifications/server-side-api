(function () {
    'use strict';
    // Configs do express
    module.exports = {
        load: function (app, express, passport) {
            app.use(express.cookieParser());
            app.use(express.session({secret: 'the sechet'}));
            app.use(passport.initialize());
            app.use(passport.session());
        }
    };
}());
