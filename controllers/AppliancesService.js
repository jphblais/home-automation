'use strict';

let WemoClient = require('wemo-client');
let WemoDriver = require('../drivers/wemo');
let wemo = new WemoClient();

let wemoDriver = new WemoDriver(wemo, console);
wemoDriver.start();

exports.get = function (args, res) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(wemoDriver.getDevicesInfo()));
};

exports.on = function (args, res) {
  res.setHeader('Content-Type', 'application/json');
  wemoDriver.turnOn(args.id.value);
  res.end();
};

exports.off = function (args, res) {
  res.setHeader('Content-Type', 'application/json');
  wemoDriver.turnOff(args.id.value);
  res.end();
};

