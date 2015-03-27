/**
 * Module dependencies.
 */
if (process.cwd() != __dirname) {
    process.chdir(__dirname);
}
var config = require('./config');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var express = require('express');
var path = require('path');
var ejs = require('ejs');
var morgan = require('morgan');
var i18n = require('i18n');
var app = express();

var isProxy = typeof config.inProcessDatabase == 'undefined' || config.inProcessDatabase.enable == false;
if (!isProxy) {
    global.NorthwindServerPath = path.join(process.cwd(), '../rdb-server/Debug');
}

i18n.configure({
    locales: config.supportedLocals,
    cookie: 'locale',
    directory: __dirname + '/locales'
});

app.use(morgan('dev'));

// all environments
var port = process.env.PORT || config.port;
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view options', { layout: false });
app.set('view engine', 'ejs');
app.use(i18n.init);
// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

/* start  ------ mounting routes ------------- */
app.use('/extern-lib/', express.static(path.join(process.cwd(), '../external/bower_components')));
app.use('/extern/', express.static(path.join(process.cwd(), '../external/public')));
app.use('/service-clients/', express.static(path.join(process.cwd(), '../service-clients')));
app.use(express.static(path.join(__dirname, 'public')));
var dbaccess = require('./controllers/access-control.json');
if (dbaccess.allowed) {
    var dbr = require(path.join(process.cwd(), '../services/routes')).router;
    dbr.filter = dbaccess;
    dbr.vpath = path.join(process.cwd(), '../services/views');
    app.use('/Services/DataService', dbr);
    app.use('/services', dbr);
}
app.use('/', require('./routes/default').router);
/* end  ------ routes ------------- */

app.use(cookieParser('secret code'));
app.use(methodOverride());

if (isProxy) {
    var db = new (require(path.join(process.cwd(), '../services/adapters/proxies/Northwind/api/NorthwindService')))();
    db.SignInService({ cntx: {}, credentials: null }).then(function (data) {
        console.log('Server successfully signed in backend data services ... ');
        var server = require('http').Server(app);
        global.NorthwindClientContext = data;
        global.app = app;
        global.server = server;
        server.listen(port, function () {
            console.log('Server listening at port %d', port);
            var io = require('socket.io')(server);
            global.io = io;
            var monitorsSetup = require(path.join(process.cwd(), '../services/controllers/Northwind/setup-monitors'));
            monitorsSetup(dbaccess);
        });
    }).catch(function (error) {
        console.log('data service error: [' + error.httpCode + ']: ' + error.err.message);
    }).done();
} else {
    var db = new (require(path.join(process.cwd(), '../services/adapters/servers/Northwind/api/NorthwindService')))();
    db.AttachDataEngine({
        textResourceDir: path.join(process.cwd(), '../services/resources/Northwind'),
        connectString: undefined
    }).then(function () {
        return db.SignInService({ cntx: {}, credentials: null }).then(function (data) {
            console.log('Server successfully signed in backend data services ... ');
            var server = require('http').Server(app);
            global.NorthwindClientContext = data;
            global.app = app;
            global.server = server;
            server.listen(port, function () {
                console.log('Server listening at port %d', port);
                var io = require('socket.io')(server);
                global.io = io;
                var monitorsSetup = require(path.join(process.cwd(), '../services/controllers/Northwind/setup-monitors'));
                monitorsSetup(dbaccess);
            });
        }).then(function () {
            // for mem or demo
            return db.LoadDatabase({
                cntx: global.NorthwindClientContext, 
                basePath: path.join(process.cwd(), '../data/Northwind')
            }).then(function () {
                console.log('database loaded ...');
            });
        });
    }).catch(function (error) {
        if (typeof error.httpCode != 'undefined') {
            console.log('data service error: [' + error.httpCode + ']: ' + error.err.message);
        } else {
            console.log(error);
        }
    }).done();;
}