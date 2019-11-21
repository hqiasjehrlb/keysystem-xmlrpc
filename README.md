# keysystem-xmlrpc
An implementation for keysystem xmlrpc method call

## Construct
```javascript
const Keysystem = require('keysystem-xmlrpc');

const keysystem = new Keysystem('https://api-ote.rrpproxy.net:8083/xmlrpc', { s_opmode: 'OTE' });
```

## Call a method
```javascript
keysystem.request('CheckDomain', s_login, s_pw, { DOMAIN: 'checkthis.la' })
  .then(response => {
    console.log(response);
  });
```

## More infomation
See official [wiki](https://wiki.rrpproxy.net/api/api-commands/api-command-reference)
