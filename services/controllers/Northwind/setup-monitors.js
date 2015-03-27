/* ------------------------------------------------------------------------------
 *
 *     This code was generated by CGW X-Script Code Generator.
 *
 *     Archymeta Information Technologies Co., Ltd.
 *
 *     Changes to this file, especially those bit flags, may cause incorrect behavior and will be lost if
 *     the code is regenerated.
 * 
 ------------------------------------------------------------------------------ */

var root = process.cwd(), path = require('path'),
    apppath = typeof global.appPath === 'undefined' || global.appPath === '' ? '' : 'config/' + global.appPath + '/',
    winston = require(root + '/node_modules/winston'),
    config = require(path.join(root, apppath + 'config'));

var subscribe = function (svc) {
    var isProxy = typeof config.inProcessDatabase === 'undefined' || config.inProcessDatabase.enable === false;
    try {
        if (isProxy) {
            var db = new (require('../../adapters/proxies/' + svc + '/api/' + svc + 'Service'))();
        } else {
            var db = new (require('../../adapters/servers/' + svc + '/api/' + svc + 'Service'))();
        }
        db.SubscribeToUpdates({
            cntx: global[svc + 'ClientContext'],
            ownerId: 'system-admin',
            subscriberId: 'system-admin',
            sets: null
        }).then(function () {
            winston.log('info', 'subscribed to %s data change event ...', svc);
            var io = global.io.of('/' + svc + '-change-monitor');
            io.on('connection', function (s) {
                winston.log('info', 'socket.io client [' + svc + '-change-monitor] %s', s.id);
                s.on('leave', function (msg) {
                    s.disconnect();
                });
                s.on('disconnect', function () {
                    winston.log('info', 'socket.io client [' + svc + '-change-monitor] %s disconnected ...', s.id);
                });
            });
            db.removeAllListeners('dataChange');
            db.on('dataChange', function (entity) {
                io.emit('entity-changed', entity);
            });
        }, function (err) {
            winston.log('error', 'subscription to %s data change failed ...', svc, err);
        });
    } catch (ex) {
        winston.log('error', '%s change subscription failed.', svc, ex);
    }
}

var func = function(svc, filter) {
    if (filter && filter.monitoring) {
        subscribe(svc);
    }
};

module.exports = func;