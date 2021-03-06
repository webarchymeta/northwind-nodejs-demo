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
    apppath = typeof global.appPath === 'undefined' || global.appPath === '' ? '' : 'config/' + global.appPath + '/',
    path = require('path'), http = require('http'), url = require('url'),
    events = require(path.join(root, 'node_modules/events')),
    B = require(path.join(root, 'node_modules/bluebird')),
    _ = require(path.join(root,'node_modules/lodash')),
    winston = require(path.join(root, 'node_modules/winston')),
    config = require(path.join(root, apppath + 'config'));

var eventStream = function (sourceUrl) {
    var self = this;
    var streamBaseUrl = url.parse(sourceUrl);
    var subscribe_params = null;
    var stream_ended = false;
    var fail_count = 0;

    self.subscribe = function (input) {
        var _promise = new B(function (resolve, reject) {
            if (subscribe_params === null)
                subscribe_params = input;
            var opts = {
                hostname: streamBaseUrl.hostname,
                host: streamBaseUrl.host,
                port: streamBaseUrl.port,
                path: streamBaseUrl.pathname + '/subscribe',
                method: 'POST'
            };
            var param = {
                cntx: JSON.stringify(input.cntx),
                ownerID: input.ownerID,
                subscriberID: input.subscriberID,
                sets: JSON.stringify(input.sets)
            };
            var currData = '';
            var rescnt = 0;
            var channelId = input.subscriberID;
            var req = http.request(opts, function (res) {
                //self.emit('status', res.statusCode === 200);
                res.setEncoding('utf8');
                var firstline = true;
                res.on('data', function (chunk) {
                    if (firstline) {
                        firstline = false;
                        winston.log('debug', '[server] ' + chunk);
                        if (chunk.indexOf('event-stream-started:') === 0) {
                            var emitter = new events.EventEmitter();
                            if (typeof global.service_event_subscribers === 'undefined') {
                                global.service_event_subscribers = [];
                                var sub = undefined;
                            } else {
                                var sub = _.find(global.service_event_subscribers, function (s) { return s.id === channelId });
                            }
                            if (!sub) {
                                global.service_event_subscribers.push({ id: channelId, e: emitter });
                            } else {
                                sub.e = emitter;
                            }
                            resolve(emitter);
                        }
                        else 
                            reject(chunk);
                    }
                    if (chunk.indexOf('{ "end-cid": "') === 0) {
                        winston.log('debug', '[server] event-stream-ended');
                        var einfo = JSON.parse(chunk);
                        stream_ended = true;
                        var sub = _.find(global.service_event_subscribers, function (s) { return s.id === einfo['end-cid']; });
                        if (typeof sub !== 'undefined' && sub)
                            sub.e.emit('streamEnded', einfo['end-cid']);
                    } else {
                        currData += chunk;
                        var msgEnd = currData.indexOf('@>') > -1;
                        while (msgEnd) {
                            var istart = currData.indexOf('<@\r\n') + 4;
                            var iend = currData.indexOf('\r\n@>');
                            var _evtstr = currData.substr(istart, iend - istart);
                            var payload;
                            try {
                                payload = JSON.parse(_evtstr);
                            } catch (ex) {
                                payload = null;
                            }
                            iend += 6;
                            currData = iend >= currData.length ? '' : currData.substr(iend, currData.length - iend);
                            msgEnd = currData.indexOf('@>') > -1;
                            if (payload !== null) {
                                var sub = _.find(global.service_event_subscribers, function (s) { return s.id === payload.cid; });
                                if (typeof sub !== 'undefined' && sub) {
                                    sub.e.emit('dataChange', payload.e);
                                } else {
                                    winston.log('warn', 'payload for channel: ' + payload.cid + ' has no handler');
                                }
                            }
                        }
                    }
                });
                if (res.statusCode !== 200) {
                    winston.log('error', 'failed [' + res.statusCode + ']');
                    reject(res.statusCode);
                }
            });
            req.on('connect', function (r, s, h) {
                s.on('end', function () {
                    setTimeout(try_reconnect, 300);
                });
            });
            req.on('error', function (e) {
                winston.log('error', 'problem with subscribe request: ' + e.message);
            });
            var data = JSON.stringify(param);
            var databf = new Buffer(data);
            req.setHeader('Accept', 'text/event-stream');
            req.setHeader('Connect', 'keep-alive');
            req.setHeader('Content-Type', 'application/json; charset=utf-8');
            req.setHeader('Content-Length', databf.length);
            req.setHeader('Cache-Control', 'no-cache');
            req.setHeader('Pragma', 'no-cache');
            req.setHeader('User-Agent', 'Event Stream Subscriber');
            req.setHeader('X-Requested-With', 'Node JS HttpRequest');
            req.write(databf);
            req.end();
        });
        return _promise;
    };
    
    var try_reconnect = function () {
        if (!stream_ended) {
            fail_count++;
            if (fail_count < config.maxEventsReconnectCount) {
                winston.log('debug', 'Subscription disconnected. try to reconnect ...');
                self.subscribe(subscribe_params);
            } else {
                winston.log('debug', 'Subscription disconnected. Maximum re-tries exceeded, quit ...');
            }
        }
    }

    self.unsubscribe = function (input) {
        var _promise = new B(function (resolve, reject) {
            var opts = {
                hostname: streamBaseUrl.hostname,
                host: streamBaseUrl.host,
                port: streamBaseUrl.port,
                path: streamBaseUrl.pathname + '/unsubscribe',
                method: 'POST'
            };
            var param = {
                cntx: JSON.stringify(input.cntx),
                ownerID: input.ownerID,
                subscriberID: input.subscriberID
            };
            var idx = -1;
            if (typeof global.service_event_subscribers !== 'undefined') {
                for (var i = 0; i < global.service_event_subscribers.length; i++) {
                    if (global.service_event_subscribers[i].id === input.subscriberID) {
                        idx = i;
                        break;
                    }
                }
            }
            var sub = idx === -1 ? undefined : global.service_event_subscribers[idx];
            var req = http.request(opts, function (res) {
                if (res.statusCode === 200) {
                    res.setEncoding('utf8');
                    res.on('data', function (chunk) {
                        if (res.statusCode !== 200) {
                            req.on('error', function (e) {
                                winston.log('error', 'failed [' + res.statusCode + '] \r\n' + chunk);
                            });
                        }
                    });
                    req.end();
                    resolve(sub ? sub.e : undefined);
                } else if (res.statusCode < 300) {
                    req.end();
                    resolve(sub ? sub.e : undefined);
                } else 
                    reject(res.statusCode);
                if (idx !== -1) {
                    global.service_event_subscribers.splice(idx, 1);
                }
            });
            req.on('error', function (e) {
                winston.log('error', 'problem with unsubscribe request: ' + e.message);
            });
            var data = JSON.stringify(param);
            req.setHeader('Accept', '*/*');
            req.setHeader('Connect', 'close');
            req.setHeader('Content-Type', 'application/json; charset=utf-8');
            req.setHeader('Content-Length', data.length);
            req.setHeader('Cache-Control', 'no-cache');
            req.setHeader('Pragma', 'no-cache');
            req.setHeader('User-Agent', 'Event Stream Subscriber');
            req.setHeader('X-Requested-With', 'Node JS HttpRequest');
            req.write(data, 'utf8');
            req.end();
        });
        return _promise;
    };

}

module.exports = eventStream;