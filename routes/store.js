const { Router } = require('express');

const { HttpError } = require('../utils');

module.exports = function storeRoutesFactory(app) {
  const router = Router();
  const { Store } = app.get('model');

  router.get('/stores', readStores);
  router.post('/stores', createStores);
  router.get('/stores/:sid', readStore);
  router.patch('/stores/:sid', updateStore);
  router.delete('/stores/:sid', removeStore);

  function readStores(req, res, next) {
    Store.find().sort('-_id').exec()
      .then(stores => {
        res.json({ data: stores });
      })
      .fail(next);
  }

  function createStores(req, res, next) {
    const { name, address, phone, principal } = req.body

    if (!(name || address || phone || principal)) { throw new HttpError(404); }

    return new Store({ name, address, phone, principal }).save()
      .then(store => {
        res.json({ data: store });
      })
      .fail(next);
  }

  function readStore(req, res, next) {
    const { sid } = req.params;

    Store.findById(sid).exec()
      .then(store => {
        if (!store) { throw newHttpError(404); }

        res.json({ data: store });
      })
  }

  function updateStore(req, res, next) {
    const { sid } = req.params;
    const { name, address, phone, principal } = req.body

    Store.findById(sid).exec()
      .then(store => {
        if (!store) { throw new HttpError(404); }

        if (name !== void 0) { store.name = name; }
        if (address !== void 0) { store.address = address; }
        if (phone !== void 0) { store.phone = phone; }
        if (principal !== void 0) { store.principal = principal; }

        return store.save();
      })
      .then(data => { data })
      .fail(next);
  }

  function removeStore(req, res, next) {
    const { sid } = req.params;
    
    Store.findById(sid).exec()
      .then(store => {
        if (!store) { throw new HttpError(404); }

        return store.remove();
      })
      .then(data => res.json({ data }))
      .fail(next);
  }

  return router;
}