const { Router } = require('express');
const storeRoutesFactory = require('./store');

function routesFactorey(app) {
    const router = Router();

    router.all('/', index);
    router.use(storeRoutesFactory(app));


    function index(req, res, next) {
        res.json({ data: new Date().toISOString() });
    }

    return router;
}

module.exports = {
    routesFactorey
}