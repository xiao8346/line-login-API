const { Schema } = require('mongoose')

module.exports = function storeModel(conn) {
    const storeSchema = new Schema({
        name: {
            type: String,
        },
        address: {
            type: String,
        },
        phone: {
            type: String,
        },
        principal: {
            type: String
        }
    })

    const Store = conn.model('store', storeSchema);

    return Store;
}