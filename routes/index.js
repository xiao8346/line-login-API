const { Router } = require('express');
const storeRoutesFactory = require('./store');
const lineRoutesFactory = require('./line');

function routesFactorey(app) {
    const router = Router();

    router.all('/', index);
    router.use(storeRoutesFactory(app));
    router.use(lineRoutesFactory(app));

    function index(req, res, next) {
        res.json({ data: new Date().toISOString() });
    }

    return router;
}

module.exports = {
    routesFactorey
}
