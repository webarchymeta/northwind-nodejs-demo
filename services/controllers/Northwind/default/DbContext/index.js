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
    handler = require(path.join(__dirname, '../override/DbContext'));
} catch (ex) {
    handler = null;
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
    if (router.filter.readOnly && req.params.method === 'CreateDatabase') {
        res.writeHead(403);
        res.end();
        return;
    }
    if ((router.filter.authenticate || router.filter[req.params.method].authenticate) && (typeof req.isAuthenticated !== 'function' || !req.isAuthenticated())) {
        res.writeHead(401);
        res.end();
        return;
    }
    if (req.params.method === 'CreateDatabase') {
        var mfilter = router.filter[req.params.method];
        if (!mfilter || mfilter.authenticate && mfilter.roles && (!req.isAuthenticated() || !role_match(mfilter.roles, req.user.roles))) {
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
        api = new (require(path.join(root, '../services/adapters/proxies/Northwind/api/NorthwindService')))();
    } else {
        api = new (require(path.join(root, '../services/adapters/servers/Northwind/api/NorthwindService')))();
    }
    if (typeof api[req.params.method] === 'function') {
        var body = '';
        req.on('data', function(chunk) {
            body += chunk;
        });
        req.on('end', function() {
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
        });
    } else {
        res.writeHead(404);
        res.end();
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
    } else {
        res.render(router.vpath + '/edit/' + req.params.page + '.html', { filter: router.filter.parent });
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
    } else {
        res.render(router.vpath + '/edit/shell.html', { title: 'Northwind', filter: router.filter.parent });
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
        res.render(router.vpath + '/view/' + req.params.page + '.html', { filter: router.filter.parent });
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
        res.render(router.vpath + '/view/shell.html', { title: 'Northwind', filter: router.filter.parent });
    }
});

module.exports.router = router;