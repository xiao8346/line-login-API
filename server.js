const { URLSearchParams } = require('url');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const Q = require('q');

const { modelsFactory } = require('./model');
const { routesFactorey } = require('./routes');

const app = express();
mongoose.Promise = Q.Promise;
const conn = mongoose.createConnection('mongodb://localhost:27017/test', { useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.json());
app.set('model', modelsFactory(conn));

app.use(routesFactorey(app));


// ------------------------------------------------------------------------------------
app.post('/line-login-token', lineLogin);

function lineLogin(req, res, next) {
    const { code, redirectUri } = req.body;

    console.log('code', code);
    console.log('redirectUri', redirectUri);

    const form = new URLSearchParams();
    form.append('grant_type', 'authorization_code');
    form.append('code', code);
    form.append('redirect_uri', redirectUri);
    form.append('client_id', '1565412044');
    form.append('client_secret', '801ce391653458f7f13162bd2e08c6e8');

    fetch('https://api.line.me/oauth2/v2.1/token', { method: 'POST', body: form })
        .then(res => res.json())
        .then(json => {
            console.log(json);

            res.json({ data: json });
        });
}


app.use(function (err, req, res, next) {
    err.status = err.status || 500;
    err.message = STATUS_CODES[err.status]
    res.status(err.status);
    res.json(err);
});

const port = process.env.PORT || 3300;

app.listen(port, () => { console.log('listen 3300 port'); })