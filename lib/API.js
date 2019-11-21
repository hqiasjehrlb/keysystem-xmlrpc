const xmlrpc = require('xmlrpc');
const _ = require('lodash');
const { URL } = require('url');

module.exports = class API {
  /**
   * @param {string} url keysystem connect url, example: 'http://api-ote.rrpproxy.net:8081/xmlrpc'
   * @param {*} opt global optional params, ote should pass s_opmode: 'OTE' here, default s_encode: 'UTF-8'
   */
  constructor (url, opt) {
    const {
      protocol,
      hostname,
      port,
      pathname
    } = new URL(url);
    const connOpt = {
      host: hostname,
      port: parseInt(port) || 80,
      path: pathname
    };
    const client = /https/.test(protocol) ?
      xmlrpc.createSecureClient(connOpt) :
      xmlrpc.createClient(connOpt);

    const global_params = Object.assign({ s_encode: 'UTF-8' }, opt);

    // private arguments
    Object.defineProperties(this, {
      _client: { get () { return client; } },
      _global_params: { get () { return global_params; } }
    });
  }

  /**
   * @param {string} command
   * @param {string} s_login
   * @param {string} s_pw
   * @param {object} data
   */
  async request (command, s_login, s_pw, data) {
    /**
     * @type {BaseResponse}
     */
    const rslt = await new Promise((rslv, rej) => {
      this._client.methodCall('Api.xcall', [_.omitBy({
        ...this._global_params,
        ...data,
        s_login,
        s_pw,
        command
      }, _.isNil)], (err, value) => {
        if (err) {
          rej(err);
        } else {
          rslv(value);
        }
      });
    }).catch(err => {
      console.error('xmlrpc_methodCall_error:', err);
      throw err;
    });
    return rslt;
  }

  get BaseResponse () {
    return {
      DESCRIPTION: '',
      CODE: 0,
      PROPERTY: {}
    };
  }
};

/**
 * @typedef BaseResponse
 * @property {string} DESCRIPTION
 * @property {number} CODE
 * @property {*} PROPERTY
 */
