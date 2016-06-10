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

var root = process.cwd(),
    path = require('path'),
    httpreq = require(path.join(root, 'node_modules/request')),
    events = require(path.join(root, 'node_modules/events')),
    _ = require(path.join(root, 'node_modules/lodash')),
    B = require(path.join(root, 'node_modules/bluebird')),
    config = require(path.join(root, 'config/' + global.appPath + '/config'));

var evt_src = function (_cntx) {

    var self = this;
    var cntx = _cntx;

    var subInfo = function (subId, ownerId, e) {
        this.id = subId;
        this.oid = ownerId;
        this.evt = e;
    };

    self.subscribe = function (arg) {
        return new B(function (resolve, reject) {
            var backendUrl = config[global.database + 'ServiceBaseUrl'];
            var opts = {
                url: backendUrl + '/data-change-subscription/add',
                method: 'POST',
                json: {
                    cntx: cntx,
                    cbip: config.backendEvents.callbackIP,
                    cbport: config.backendEvents.callbackPort || config.port,
                    args: arg
                }
            };
            httpreq(opts, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var emitter = new events.EventEmitter();
                    var sub = new subInfo(arg.subscriberID, arg.ownerID, emitter);
                    var etable = global['backend-data-event-table'];
                    if (!etable) {
                        etable = [];
                        global['backend-data-event-table'] = etable;
                        etable.push(sub);
                    } else {
                        var idx = -1;
                        var len = etable.length;
                        var old = undefined;
                        for (var i = 0; i < len; i++) {
                            if (etable[i].id === arg.subscriberID) {
                                idx = i;
                                old = etable[i];
                                break;
                            }
                        }
                        if (idx === -1) {
                            etable.push(sub);
                        } else if (arg.ownerID === old.oid) {
                            old.evt.removeAllListeners();
                            etable[idx] = sub;
                        } else {
                            // its should already been rejected by the server, there is something wrong here
                            reject(new Error('change of a subscription by a different owner is not allowed!'));
                        }
                    }
                    resolve(emitter);
                } else {
                    if (response)
                        reject({ err: error, httpCode: response.statusCode, msg: body });
                    else
                        reject({ err: error, httpCode: -1 });
                }
            });
        });
    };

    self.unsubscribe = function (arg) {
        return new B(function (resolve, reject) {
            var backendUrl = config[global.database + 'ServiceBaseUrl'];
            var opts = {
                url: backendUrl + '/data-change-subscription/remove',
                method: 'POST',
                json: {
                    cntx: cntx,
                    args: arg
                }
            };
            httpreq(opts, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var etable = global['backend-data-event-table'];
                    if (etable) {
                        var idx = -1;
                        var len = etable.length;
                        var old = undefined;
                        for (var i = 0; i < len; i++) {
                            if (etable[i].id === arg.subscriberID) {
                                idx = i;
                                old = etable[i];
                                break;
                            }
                        }
                        if (idx > -1) {
                            if (arg.ownerID === old.oid) {
                                etable.splice(idx, 1);
                            } else {
                                // its should already been rejected by the server, there is something wrong here
                                reject(new Error('cancel of a subscription by a different owner is not allowed!'));
                            }
                            resolve(old.evt)
                        } else {
                            resolve(undefined);
                        }
                    } else {
                        resolve(undefined);
                    }
                } else {
                    if (response)
                        reject({ err: error, httpCode: response.statusCode, msg: body });
                    else
                        reject({ err: error, httpCode: -1 });
                }
            });
        });
    };

    self.emitDataChange = function (e) {
        return new B(function (resolve, reject) {
            var etable = global['backend-data-event-table'];
            if (etable) {
                var sub = _.find(etable, function (sub) { return sub.id === e.subscriberId && sub.oid === e.ownerId; });
                if (sub) {
                    sub.evt.emit('dataChange', e.evt);
                }
            }
            resolve();
        });
    };
};

module.exports = evt_src;