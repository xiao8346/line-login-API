
let models;

function modelsFactory(conn) {
    if (models) { return models; }

    const Store = require('./store')(conn);

    models = {
        Store,
    }

    return models
}

module.exports = {
    modelsFactory
}