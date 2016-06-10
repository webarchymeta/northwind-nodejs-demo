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
        queryTerms: 'service-clients/scripts/Northwind/customize/CustomerDemographicSet/querytokens',
        model: 'service-clients/scripts/Northwind/models/sets/CustomerDemographic',
        queryComposer: 'service-clients/scripts/Northwind/controllers/QueryComposer',
        queryInputTemplate: 'services/Northwind/__templates/widgets/QueryComposer.html',
        listactions: 'service-clients/scripts/Northwind/controllers/sets/CustomerDemographicSet/view/list',
        actions: 'service-clients/scripts/Northwind/controllers/sets/CustomerDemographicSet/view/entity'
    }
});

pageMgr = null;
currentClientConfig = null;

requirejs(['knockout', 'pageManager', 'listactions', 'config', 'model'], function (ko, pMgr, opType, config, model) {

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

    pMgr.loadedControllerTable['service-clients/scripts/Northwind/controllers/sets/CustomerDemographicSet/view/list'] = opType;

    $(function () {
        pageMgr = pMgr;
        var filter = typeof subsetfilter === 'undefined' ? null : subsetfilter;
        pMgr.opContextType = opType;
        pMgr.categPath = 'CustomerDemographicSet';
        var op = new opType();
        currentClientConfig = config;
        op.initialize(filter).done(function (m) {
            pMgr.loadPage('CustomerDemographicSet/' + config.listViewEntryPart, m, op).done(function (page) {
                pMgr.opContext = 'service-clients/scripts/Northwind/controllers/sets/CustomerDemographicSet/view/list';
                pMgr.currentDataModel = m;
                $('#prev').css({ visibility: 'visible' });
                $('#next').css({ visibility: 'visible' });
                var elm = $(pMgr.contentContainer);
                elm.html('');
                elm.html(page.content);
                ko.applyBindings(pMgr);
                if ($('#page-end-mark').length === 1) {
                    initAutoScrollLoad();
                }
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