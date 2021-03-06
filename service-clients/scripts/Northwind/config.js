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

define([ 'knockout' ], function (ko) {

    var config = {
        baseUrl: '',
        databaseName: 'Northwind',
        listViewEntryPart: 'list-paged-page',
        entityViewEntryPart: 'entity-page',
        removePageAlterHistory: true,
        maxChangeLogEntries: 200,
        defaultPageSize: 15,
        defaultPageBlockSize: 10,
        contentContainer: '.content-container'
    };

    ko.components.register('text-widget', {
        viewModel: function (params) {
            var self = this;
            self.content = ko.observable('');
            $.ajax({
                url: config.baseUrl + '/services/' + config.databaseName + '/' + params.path + '/' + params.qstr,
                type: 'GET',
                contentType: 'text/plain',
                success: function(text) {
                    self.content(text);
                },
                error: function(jqxhr, textStatus) {
                    if (typeof alert === 'function') {
                        alert(jqxhr.statusText + '\r\n\r\n' + jqxhr.responseText);
                    } else if (typeof navigator !== 'undefined' && typeof navigator.notification !== 'undefined') {
                        navigator.notification.alert(jqxhr.statusText + '\r\n\r\n' + jqxhr.responseText);
                    }
                }
            });
        },
        template: '<div data-bind="text: content"></div>'
    });

    ko.components.register('html-widget', {
        viewModel: function (params) {
            var self = this;
            self.content = ko.observable('');
            $.ajax({
                url: config.baseUrl + '/services/' + config.databaseName + '/' + params.path + '/' + params.qstr,
                type: 'GET',
                contentType: 'text/html',
                success: function(html) {
                    self.content(html);
                },
                error: function(jqxhr, textStatus) {
                    if (typeof alert === 'function') {
                        alert(jqxhr.statusText + '\r\n\r\n' + jqxhr.responseText);
                    } else if (typeof navigator !== 'undefined' && typeof navigator.notification !== 'undefined') {
                        navigator.notification.alert(jqxhr.statusText + '\r\n\r\n' + jqxhr.responseText);
                    }
                }
            });
        },
        template: '<div data-bind="html: content"></div>'
    });

    return config;
});