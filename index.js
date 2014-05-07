var inbox = require ('inbox');
var thunkify = require ('thunkify');

var methods = [
  'listMailboxes',
  'openMailbox',
  'getCurrentMailbox',
  'listMessages',
  'listMessagesByUID',
  'listFlags',
  'updateFlags',
  'addFlags',
  'removeFlags',
  'updateLabels',
  'addLabels',
  'removeLabels',
  'fetchFlags',
  'fetchData',
  'createMessageStream',
  'copyMessage',
  'deleteMessage',
  'moveMessage',
  'storeMessage',
  'getMailbox',
  'idle',
  'search'
];

var events = ['close', 'connect'];

function init(port, host, options){
  var client = inbox.createConnection(port, host, options);
  var obj = {};
  function event (name){
    return function (cb) {
      client[name]();
      client.on(name, cb);
      client.on('error', cb);
    }
  }
  methods.forEach(function(method){
    obj[method] = function * (){
      return yield thunkify(client[method]).apply(client, Array.prototype.slice.call(arguments));
    }
  });
  events.forEach(function(method){
    obj[method] = thunkify(event(method));   
  });
  return obj;
}

exports.init = init;