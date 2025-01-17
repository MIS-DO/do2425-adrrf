const service = require('../services/apiv1fragancenameService.js');

module.exports.findByname = function findByname(req, res) {
    service.findByname(req, res);
}

module.exports.updateFragance = function updateFragance(req, res) {
    service.updateFragance(req, res);
}

module.exports.deleteFragance = function deleteFragance(req, res) {
    service.deleteFragance(req, res);
}

