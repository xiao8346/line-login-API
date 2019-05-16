const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Q = require('q');

const { STATUS_CODES } = require('http');

const { modelsFactory } = require('./model');
const { routesFactorey } = require('./routes');

const app = express();
mongoose.Promise = Q.Promise;
const conn = mongoose.createConnection('mongodb://localhost:27017/test', { useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.json());
app.set('model', modelsFactory(conn));

app.use(routesFactorey(app));

app.use(function (err, req, res, next) {
    err.status = err.status || 500;
    err.message = STATUS_CODES[err.status];
    res.status(err.status);
    res.json(err);
});

const port = process.env.PORT || 3300;

app.listen(port, () => { console.log('listen 3300 port'); })
