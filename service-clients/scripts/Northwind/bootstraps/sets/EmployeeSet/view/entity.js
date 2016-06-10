requirejs.config({
    baseUrl: '/',
    paths: {
        requirejs: 'extern-lib/requirejs/require',
        knockoutjs: 'extern-lib/knockout/dist/knockout',
        knockout: 'extern/scripts/bundles/knockout-ext',
        socketio: 'extern-lib/socket.io-client/socket.io',
        vis: 'extern-lib/vis/dist/vis.min',
        pageManager: 'service-clients/scripts/pageManager',
        config: 'service-clients/scripts/Northwind/config',
        queryModels: 'service-clients/scripts/Northwind/models/common/QueryModels',
        commonQueryTerms: 'service-clients/scripts/Northwind/customize/querytokens',
        queryTerms: 'service-clients/scripts/Northwind/customize/EmployeeSet/querytokens',
        model: 'service-clients/scripts/Northwind/models/sets/Employee',
        queryComposer: 'service-clients/scripts/Northwind/controllers/QueryComposer',
        queryInputTemplate: 'services/Northwind/__templates/widgets/QueryComposer.html',
        listactions: 'service-clients/scripts/Northwind/controllers/sets/EmployeeSet/view/list',
        actions: 'service-clients/scripts/Northwind/controllers/sets/EmployeeSet/view/entity'
    }
});

pageMgr = null;
currentClientConfig = null;

requirejs(['knockout', 'pageManager', 'actions', 'config', 'model'], function (ko, pMgr, opType, config, model) {

    pMgr.ResolveRoute = function (uri) {
        var database = typeof uri.db !== 'undefined' ? uri.db : config.databaseName;
        var categ = uri.kind === 'DbContext' ? '' : '/sets';
        var mode = typeof uri.mode === 'undefined' ? 'view' : uri.mode;
        var vpath = uri.kind + '/' + (typeof uri.mode === 'undefined' || uri.mode === 'view' ? '' : 'edit/') + uri.id;
        var cpath = categ + '/' + uri.kind + '/' + mode;
        var url = config.baseUrl + '/services/' + database + '/' + vpath;
        var ctrlrId = 'service-clients/scripts/' + database + '/controllers/' + cpath + '/' + (uri.id.indexOf('list') === 0 ? 'list' : 'entity');
        return { url: url, controllerId: ctrlrId };
    }

    pMgr.loadedControllerTable['service-clients/scripts/Northwind/controllers/sets/EmployeeSet/view/entity'] = opType;

    $(function () {
        pageMgr = pMgr;
        currentClientConfig = config;
        pMgr.opContextType = opType;
        pMgr.categPath = 'EmployeeSet';
        var op = new opType();
        op.initialize(EmployeeID).done(function (m) {
            pMgr.loadPage(config.entityViewEntryPart, m).done(function (page) {
                pMgr.opContext = 'service-clients/scripts/Northwind/controllers/sets/view/Employee';
                pMgr.currentDataModel = m;
                $('#prev').css({ visibility: 'visible' });
                $('#next').css({ visibility: 'visible' });
                var elm = $(pMgr.contentContainer);
                elm.html('');
                elm.html(page.content);
                pMgr.eop = op;
                ko.applyBindings(pMgr);
            }).fail(function (jqxhr, textStatus, error) {
                if (typeof config.alert === 'function') {
                    config.alert(jqxhr.statusText + '\r\n\r\n' + jqxhr.responseText);
                } else {
                    alert(jqxhr.statusText + '\r\n\r\n' + jqxhr.responseText);
                }
            });
        }).fail(function (jqxhr, textStatus, error) {
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