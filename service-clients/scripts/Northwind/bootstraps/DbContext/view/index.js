requirejs.config({
    baseUrl: '/',
    paths: {
        requirejs: 'extern-lib/requirejs/require',
        knockoutjs: 'extern-lib/knockoutjs/dist/knockout',
        knockout: 'extern/scripts/bundles/knockout-ext',
        socketio: 'extern-lib/socket.io-client/socket.io',
        vis: 'extern-lib/vis/dist/vis.min',
        pageManager: 'service-clients/scripts/pageManager',
        config: 'service-clients/scripts/Northwind/config',
        structs: 'service-clients/scripts/Northwind/models/common/DataStructs',
        model: 'service-clients/scripts/Northwind/models/DatabaseContext',
        action: 'service-clients/scripts/Northwind/controllers/DbContext/view/index'
    }
});

pageMgr = null;
currentClientConfig = null;

requirejs(['knockout', 'pageManager', 'action', 'config'], function (ko, pMgr, opType, config) {

    var allowedKinds = [ 'DbContext', 'CategorySet', 'CustomerCustomerDemoSet', 'CustomerDemographicSet', 'CustomerSet', 'EmployeeSet', 'EmployeeTerritorySet', 'Order_DetailSet', 'OrderSet', 'ProductSet', 'RegionSet', 'ShipperSet', 'SupplierSet', 'TerritorySet' ];
    var checkKind = function (kind) {
        for (var i = 0; i < allowedKinds.length; i++) {
            if (allowedKinds[i] === kind) {
                return true;
            }
        }
        if (typeof config.alert === 'function') {
            config.alert('Uri kind: "' + kind + '" is not known!');
        } else {
            alert('Uri kind: "' + kind + '" is not known!');
        }
        return false;
    }
    pMgr.ResolveRoute = function (uri) {
        if (!checkKind(uri.kind)) {
            return null;
        }
        var database = typeof uri.db !== 'undefined' ? uri.db : config.databaseName;
        var categ = uri.kind === 'DbContext' ? '' : '/sets';
        var mode = typeof uri.mode === 'undefined' ? 'view' : uri.mode;
        var vpath = uri.kind + '/' + (typeof uri.mode === 'undefined' || uri.mode === 'view' ? '' : 'edit/') + uri.id;
        var cpath = categ + '/' + uri.kind + '/' + mode;
        var url = config.baseUrl + '/services/' + database + '/' + vpath;
        var ctrlrId = 'service-clients/scripts/' + database + '/controllers/' + cpath + '/' + (uri.id.indexOf('list') === 0 ? 'list' : 'entity');
        return { url: url, controllerId: ctrlrId };
    }

    pMgr.loadedControllerTable['service-clients/scripts/Northwind/controllers/DbContext/view/index'] = opType;

    $(function () {
        pageMgr = pMgr;
        pMgr.opContextType = opType;
        pMgr.categPath = 'DbContext';
        var op = new opType();
        op.initialize().done(function (m) {
            pMgr.loadPage('DbContext/main-page', m).done(function (page) {
                pMgr.opContext = 'service-clients/scripts/Northwind/controllers/Database';
                pMgr.currentDataModel = m;
                $('#prev').css({ visibility: 'visible' });
                $('#next').css({ visibility: 'visible' });
                var elm = $(pMgr.contentContainer);
                elm.html('');
                elm.html(page.content);
                ko.applyBindings(pMgr);
            });
        }).fail(function(jqxhr, textStatus, error) {
            if (typeof config.alert === 'function') {
                config.alert(jqxhr.statusText + '\r\n\r\n' + jqxhr.responseText);
            } else {
                alert(jqxhr.statusText + '\r\n\r\n' + jqxhr.responseText);
            }
        });
    });

}, function (err) {
    if (typeof config.alert === 'function') {
        config.alert(err);
    } else {
        alert(err);
    }
});