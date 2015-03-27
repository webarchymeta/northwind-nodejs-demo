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
    router = require(path.join(root, 'node_modules/express')).Router(),
    _ = require(path.join(root, 'node_modules/underscore')),
    config = require(path.join(root, apppath + 'config')),
    handler;
try {
    handler = require(path.join(__dirname, '../override/sets/CustomerDemographicSet'));
} catch (ex) {
    handler = null;
}

var is_rawdata_load = function(method) {
    var dmethods = [ 'LoadEntityCustomerDescRawData' ];
    for (var i = 0; i < dmethods.length; i++) {
        if (dmethods[i] === method) {
            return true;
        }
    }
    return false;
}

var is_delayedprop_update = function(method) {
    var dmethods = [ 'UpdateEntityCustomerDesc' ];
    for (var i = 0; i < dmethods.length; i++) {
        if (dmethods[i] === method) {
            return true;
        }
    }
    return false;
}

function role_match(roles1, roles2) {
    if (typeof roles1 === 'undefined' || roles1 === null || typeof roles2 === 'undefined' || roles2 === null)
        return false;
    return _.intersection(roles1, roles2).length > 0
}

router.post('/:method', function (req, res, next) {
    if (typeof router.filter !== 'object' || typeof router.filter[req.params.method] !== 'object' || !router.filter.allowed || !router.filter[req.params.method].allowed) {
        res.writeHead(403);
        res.end();
        return;
    }
    if (router.filter.readOnly && (req.params.method === 'AddOrUpdateEntities' || req.params.method === 'EnqueueNewOrUpdateEntities' || req.params.method === 'DeleteEntities')) {
        res.writeHead(403);
        res.end();
        return;
    }
    if ((router.filter.authenticate || router.filter[req.params.method].authenticate) && (typeof req.isAuthenticated !== 'function' || !req.isAuthenticated())) {
        res.writeHead(401);
        res.end();
        return;
    }
    if (req.params.method === 'AddOrUpdateEntities' || req.params.method === 'EnqueueNewOrUpdateEntities' || req.params.method === 'DeleteEntities') {
        var mfilter = router.filter[req.params.method];
        if (!mfilter || mfilter.authenticate && mfilter.roles && (typeof req.isAuthenticated !== 'function' || !req.isAuthenticated() || !role_match(mfilter.roles, req.user.roles))) {
            res.writeHead(401);
            res.end();
            return;
        }
    }
    if (handler !== null && typeof handler[req.params.method] === 'function') {
        handler[req.params.method](req, res, next);
        return;
    }
    var isProxy = typeof config.inProcessDatabase === 'undefined' || config.inProcessDatabase.enable === false;
    var api;
    if (isProxy) {
        api = new (require(path.join(root, '../services/adapters/proxies/Northwind/api/sets/CustomerDemographicService')))();
    } else {
        api = new (require(path.join(root, '../services/adapters/servers/Northwind/api/sets/CustomerDemographicService')))();
    }
    if (typeof api[req.params.method] === 'function') {
        var body = '';
        req.on('data', function(chunk) {
            body += chunk;
        });
        req.on('end', function() {
            if (!is_rawdata_load(req.params.method)) {
                api[req.params.method](JSON.parse(body)).then(function (data) {
                    if (data) {
                        res.json(data);
                    } else {
                        res.json(null);
                    }
                    res.end();
                }, function (err) {
                    if (isProxy) {
                        res.statusCode = err.httpCode === -1 ? 500 : err.httpCode;
                        res.set('Content-Type', 'text/plain');
                        res.send(err.err);
                        res.end();
                    } else {
                        res.statusCode = 500; 
                        res.set('Content-Type', 'text/plain');
                        var msg = err.message;
                        if (typeof err.StackTrace !== 'undefined' && err.StackTrace !== undefined)
                            msg += '\r\n\r\n' + err.StackTrace;
                        res.send(msg);
                        res.end();
                    }
                }).done();
            } else {
                var method = req.params.method.substr(0, req.param.method.lastIndexOf('RawData'));
                api[method](JSON.parse(body)).then(function (data) {
                    processRawData(req, res, data, router.filter[method]);
                }, function (err) {
                    if (isProxy) {
                        res.statusCode = err.httpCode === -1 ? 500 : err.httpCode;
                        res.set('Content-Type', 'text/plain');
                        res.send(err.err);
                        res.end();
                    } else {
                        res.statusCode = 500; 
                        res.set('Content-Type', 'text/plain');
                        var msg = err.message;
                        if (typeof err.StackTrace !== 'undefined' && err.StackTrace !== undefined)
                            msg += '\r\n\r\n' + err.StackTrace;
                        res.send(msg);
                        res.end();
                    }
                }).done();
            }
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

var processRawData = function (req, res, data, filter) {
    var contentType = req.query.contentType || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    if (req.query.modified) {
        if (contentType.indexOf('text/') === 0)
            res.send(data);
        else {
            req.method = 'NONE';
            var buf = data === null ? new Buffer([]) : new Buffer(data);
            if (typeof filter === 'undefined' || typeof filter['skip-data-bytes'] === 'undefined')
                res.status(200).send(buf);
            else
                res.status(200).send(buf.slice(filter['skip-data-bytes']));
        }
    } else {
        if (contentType.indexOf('text/') === 0)
            res.send(data);
        else {
            var buf = data === null ? new Buffer([]) : new Buffer(data);
            if (typeof filter === 'undefined' || typeof filter['skip-data-bytes'] === 'undefined')
                res.send(buf);
            else
                res.send(buf.slice(filter['skip-data-bytes']));
        }
    }
    res.end();
};

router.get('/load-delayed-CustomerDesc', function (req, res, next) {
    if (typeof router.filter !== 'object' || !router.filter.allowed) {
        res.writeHead(403);
        res.end();
    } else if ((router.filter.authenticate || router.filter['LoadEntityCustomerDesc'].authenticate) && (typeof req.isAuthenticated !== 'function' || !req.isAuthenticated())) {
        res.writeHead(401);
        res.end();
        return;
    } else {
        if (req.query.modified) {
            var lastModified = new Date(parseInt(req.query.modified)).toUTCFormat('DDD, DD MMM YYYY HH:MI:SS');
            res.setHeader('Last-Modified', lastModified + ' GMT');
            if (req.headers['if-modified-since']) {
                var d2 = Date.parse(req.headers['if-modified-since']);
                var cachetime = new Date(d2).toUTCFormat('DDD, DD MMM YYYY HH:MI:SS');
                if (lastModified === cachetime) {
                    res.status(304).end();
                    return;
                }
            }
        }
        var isProxy = typeof config.inProcessDatabase === 'undefined' || config.inProcessDatabase.enable === false;
        var api;
        if (isProxy) {
            api = new (require(path.join(root, '../services/adapters/proxies/Northwind/api/sets/CustomerDemographicService')))();
        } else {
            api = new (require(path.join(root, '../services/adapters/servers/Northwind/api/sets/CustomerDemographicService')))();
        }
        var opts = { CustomerTypeID: req.query.CustomerTypeID };
        api.LoadEntityCustomerDesc(opts).then(function (data) {
            processRawData(req, res, data, router.filter['LoadEntityCustomerDesc']);
        }).catch(function (err) {
            if (isProxy) {
                res.statusCode = err.httpCode === -1 ? 500 : err.httpCode;
                res.set('Content-Type', 'text/plain');
                res.send(err.err);
                res.end();
            } else {
                res.statusCode = 500;
                res.set('Content-Type', 'text/plain');
                var msg = err.message;
                if (typeof err.StackTrace !== 'undefined' && err.StackTrace !== undefined)
                    msg += '\r\n\r\n' + err.StackTrace;
                res.send(msg);
                res.end();
            }
        }).done();
    }
});

router.get('/edit/:page', function (req, res, next) {
    if (typeof router.filter !== 'object' || !router.filter.allowed || router.filter.readOnly) {
        res.writeHead(403);
        res.end();
    } else if (router.filter.authenticate && (typeof req.isAuthenticated !== 'function' || !req.isAuthenticated())) {
        res.writeHead(401);
        res.end();
        return;
    } else if (router.filter.roles && (typeof req.isAuthenticated !== 'function' || !req.isAuthenticated() || !role_match(router.filter.roles, req.user.roles))) {
        res.writeHead(401);
        res.end();
        return;
    } else {
        res.render(router.vpath + '/edit/' + req.params.page + '.html');
    }
});

router.get('/edit', function (req, res, next) {
    if (typeof router.filter !== 'object' || !router.filter.allowed || router.filter.readOnly) {
        res.writeHead(403);
        res.end();
    } else if (router.filter.authenticate && (typeof req.isAuthenticated !== 'function' || !req.isAuthenticated())) {
        res.writeHead(401);
        res.end();
        return;
    } else if (router.filter.roles && (typeof req.isAuthenticated !== 'function' || !req.isAuthenticated() || !role_match(router.filter.roles, req.user.roles))) {
        res.writeHead(401);
        res.end();
        return;
    } else {
        var pagetitle = 'CustomerDemographics';
        if (typeof req.query.filter !== 'undefined')
            pagetitle += ' where ' + req.query.filter;
        res.render(router.vpath + '/edit/list-shell.html', { title: pagetitle, setfilter: typeof req.query.filter !== 'undefined' ? req.query.filter : null });
    }
});

router.get('/edit/entity', function (req, res, next) {
    if (typeof router.filter !== 'object' || !router.filter.allowed || router.filter.readOnly) {
        res.writeHead(403);
        res.end();
    } else if (router.filter.authenticate && (typeof req.isAuthenticated !== 'function' || !req.isAuthenticated())) {
        res.writeHead(401);
        res.end();
        return;
    } else if (router.filter.roles && (typeof req.isAuthenticated !== 'function' || !req.isAuthenticated() || !role_match(router.filter.roles, req.user.roles))) {
        res.writeHead(401);
        res.end();
        return;
    } else {
        res.render(router.vpath + '/edit/entity-shell.html', { title: 'CustomerDemographic', CustomerTypeID: req.query.CustomerTypeID });
    }
});

router.get('/entity', function (req, res, next) {
    if (typeof router.filter !== 'object' || !router.filter.allowed) {
        res.writeHead(403);
        res.end();
    } else if (router.filter.authenticate && (typeof req.isAuthenticated !== 'function' || !req.isAuthenticated())) {
        res.writeHead(401);
        res.end();
        return;
    } else {
        res.render(router.vpath + '/view/entity-shell.html', { title: 'CustomerDemographic', CustomerTypeID: req.query.CustomerTypeID });
    }
});

router.get('/:page', function (req, res, next) {
    if (typeof router.filter !== 'object' || !router.filter.allowed) {
        res.writeHead(403);
        res.end();
    } else if (router.filter.authenticate && (typeof req.isAuthenticated !== 'function' || !req.isAuthenticated())) {
        res.writeHead(401);
        res.end();
        return;
    } else {
        res.render(router.vpath + '/view/' + req.params.page + '.html');
    }
});


router.get('/', function (req, res, next) {
    if (typeof router.filter !== 'object' || !router.filter.allowed) {
        res.writeHead(403);
        res.end();
    } else if (router.filter.authenticate && (typeof req.isAuthenticated !== 'function' || !req.isAuthenticated())) {
        res.writeHead(401);
        res.end();
        return;
    } else {
        var pagetitle = 'CustomerDemographics';
        if (typeof req.query.filter !== 'undefined')
            pagetitle += ' where ' + req.query.filter;
        res.render(router.vpath + '/view/list-shell.html', { title: pagetitle, setfilter: typeof req.query.filter !== 'undefined' ? req.query.filter : null });
    }
});

module.exports.router = router;