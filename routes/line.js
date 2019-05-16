const { URLSearchParams } = require('url');

const { Router } = require('express');
const fetch = require('node-fetch');

module.exports = function lineRoutesFactory(app) {
  const router = Router();

  router.post('/line-login-token', lineLogin);

  function lineLogin(req, res, next) {
    const { code, redirectUri } = req.body;

    const form = new URLSearchParams();
    form.append('grant_type', 'authorization_code');
    form.append('code', code);
    form.append('redirect_uri', redirectUri);
    form.append('client_id', '1565412044');
    form.append('client_secret', '801ce391653458f7f13162bd2e08c6e8');

    fetch('https://api.line.me/oauth2/v2.1/token', { method: 'POST', body: form })
      .then(res => res.json())
      .then(json => {
        console.log('json', json);

        res.json({ data: json });
      });
  }

  return router;
}
