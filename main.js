var moment = require('moment');
var os = require('os');
var LCD = require('lcdi2c');
var Gpio = require('onoff').Gpio;
var util = require('util');

const INTERFACE = 'wlan0';
const subnet = '192.168.2';
var ipAddress;

var lcd = new LCD( 1, 0x27, 20, 4 );
var red = new Gpio(21, 'out');
var green = new Gpio(26, 'out');
var toggle = false;

red.writeSync(1);
green.writeSync(1);

function getIp() {
  var interfaces = os.networkInterfaces();
  ipAddress = interfaces[INTERFACE][0].address;
  if(ipAddress.substring(0, subnet.length) == subnet) {
    lcd.println('IP: '+ipAddress, 2);
  } else {
    setTimeout(getIp, 100);
  }
}

function printTime() {
  var time = moment().format('HH:mm:ss');
  lcd.println(time, 1);
  setTimeout(printTime, 500);
}

function printMemUsage() {
  var memUsage = process.memoryUsage();
  var str = memUsage.heapUsed + '/' + memUsage.heapTotal;
  lcd.println(str, 3);
  setTimeout(printMemUsage, 5000);
}

function doToggle() {
  if(toggle) {
    red.writeSync(1);
    green.writeSync(0);
  } else {
    red.writeSync(0);
    green.writeSync(1);
  }
  toggle = !toggle;
  setTimeout(doToggle, 1000);
}

setTimeout(doToggle, 0);
setTimeout(printTime, 0);
setTimeout(getIp, 0);
setTimeout(printMemUsage, 0);
lcd.clear();
lcd.println('', 3);
lcd.println('', 4);

process.on('SIGINT', function () {
  red.writeSync(1);
  green.writeSync(1);
  lcd.println('Terminated', 4);
  process.exit(0);
});

