
module.exports = class Wemo {
  constructor(WemoClient, logger = null) {
    this.client = WemoClient;
    this.devices = {};
    this.devicesInfo = {};
    this.logger = logger;
  }

  log() {
    if(this.logger) {
      this.logger.log(arguments);
    }
  }

  start() {
    let _self = this;

    this.client.discover(function (deviceInfo) {
      _self.devicesInfo[deviceInfo.serialNumber] = deviceInfo;
      _self.log('Wemo Device Found: %j', deviceInfo.friendlyName);

      // Create the device client for the found device
      let device = _self.client.client(deviceInfo);
      _self.devices[deviceInfo.serialNumber] = device;

      // Handle BinaryState events
      device.on('binaryState', function (value) {
        _self.log('Binary State changed to: %s', value);
      });

      device.getBinaryState(function (err, value) {
        _self.log(value);
      });
    });

  }

  getDevicesInfo() {
    return this.devicesInfo;
  }

  turnOn(deviceId) {
    this.devices[deviceId].setBinaryState(1);
  }

  turnOff(deviceId) {
    this.devices[deviceId].setBinaryState(0);
  }

};
