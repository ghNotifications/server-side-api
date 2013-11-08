(function () {
    'use strict';
    // Setup das rotas exclusivas para o passport
    module.exports = {
        load: function (app, passport) {
            
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
        }
    }
}());
