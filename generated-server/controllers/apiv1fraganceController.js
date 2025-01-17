const service = require('../services/apiv1fraganceService.js');

module.exports.getFragances = function getFragances(req, res) {
    service.getFragances(req, res);
}

module.exports.addFragance = function addFragance(req, res) {
    service.addFragance(req, res);
}

