(function () {
    'use strict';
    // Setup das rotas regulares do app

    var API_URL = 'https://api.github.com',
        https = require('https');

    module.exports = {
        load: function (app, ensuleLoggedIn) {
            
            app.get('/',
                function (req, res) {
                    res.json({
                        message: 'Hy, try access /auth/github ;)'
                    });
                }
            );

            app.get('/account',
                ensuleLoggedIn('/'),
                function (req, res) {
                    res.json({
                        message: 'Hi <' + req.user._json.login + '>, try access /notifications'
                    });
                }
            );

            app.get('/notifications',
                ensuleLoggedIn('/'),
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
        }
    };
}());
