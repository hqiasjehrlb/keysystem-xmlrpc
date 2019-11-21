const Keysystem = require('../index');

const {
  s_login,
  s_pw
} = require('./config.json');

const ks = new Keysystem('https://api-ote.rrpproxy.net:8083/xmlrpc', { s_opmode: 'OTE' });

ks.request('CheckDomain', s_login, s_pw, { DOMAIN: 'checkthis.la' })
  .then(response => {
    console.log(response);
  });
