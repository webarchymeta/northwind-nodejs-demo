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
        model: 'service-clients/scripts/Northwind/models/sets/Supplier',
        queryComposer: 'service-clients/scripts/Northwind/controllers/QueryComposer',
        queryInputTemplate: 'services/Northwind/__templates/widgets/QueryComposer.html',
        actions: 'service-clients/scripts/Northwind/controllers/sets/SupplierSet/edit/list'
    }
});

pageMgr = null;
currentClientConfig = null;

requirejs(['knockout', 'pageManager', 'actions', 'queryComposer'], function (ko, pMgr, op, qc) {

    ko.components.register('iquery-widget', {
        viewModel: { require: 'queryComposer' },
        template: { require: 'extern-lib/text/text!queryInputTemplate' }
    });

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

    pMgr.loadedControllerTable['service-clients/scripts/Northwind/controllers/sets/SupplierSet/edit/list'] = opType;

    $(function () {
        pageMgr = pMgr;
        pMgr.opContextType = opType;
        pMgr.categPath = 'SupplierSet';
        var filter = typeof subsetfilter === 'undefined' ? null : subsetfilter;
        op.initialize(filter).done(function (m) {
            pMgr.loadPage(config.listEditEntryPart, m).done(function (page) {
                pMgr.opContext = 'service-clients/scripts/Northwind/controllers/sets/SupplierSet/edit/list';
                pMgr.currentDataModel = m;
                $('#prev').css({ visibility: 'visible' });
                $('#next').css({ visibility: 'visible' });
                var elm = $(pMgr.contentContainer);
                elm.html('');
                elm.html(page.content);
                ko.applyBindings(pMgr);
            });

        }).fail(functon (jqxhr, textStatus) {
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