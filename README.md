# keysystem-xmlrpc
An implementation for keysystem xmlrpc method call

## Usage
construct instance
```javascript
const Keysystem = require('keysystem-xmlrpc');

/**
 * @param0 {string} keysystem api url
 * @param1 {*} global parameters use in every method call
 */
const keysystem = new Keysystem('https://api-ote.rrpproxy.net:8083/xmlrpc', { s_opmode: 'OTE' });
```

call a method
```javascript
/**
 * @param0 {string} command
 * @param1 {string} login account
 * @param2 {string} login password
 * @param3 {*} request parameters
 */
keysystem.request('CheckDomain', s_login, s_pw, { DOMAIN: 'checkthis.la' })
  .then(response => {
    console.log(response);
  });
```

## Dependencies
* xmlrpc
* lodash

## More infomation
See official [wiki](https://wiki.rrpproxy.net/api/api-commands/api-command-reference)
