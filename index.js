var Wemo = require('wemo-client');
var wemo = new Wemo();

var clients = [];
 
wemo.discover(function(deviceInfo) {
  console.log('Wemo Device Found: %j', deviceInfo);
  var client = wemo.client(deviceInfo);
  client.on('binaryState', function(value) {
    var state = value == 0 ? ' Off' : ' On';
    console.log(deviceInfo.friendlyName + state);
  });
  clients.push(client);
});
