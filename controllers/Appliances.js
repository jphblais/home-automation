'use strict';

var url = require('url');

var Appliances = require('./AppliancesService');

module.exports.appliancesGET = function appliancesGET (req, res, next) {
  Appliances.get(req.swagger.params, res, next);
};


module.exports.applianceON = function applianceON (req, res, next) {
  Appliances.on(req.swagger.params, res, next);
};


module.exports.applianceOFF = function applianceOFF (req, res, next) {
  Appliances.off(req.swagger.params, res, next);
};
