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

define(['knockout', 'config', 'model'], function (ko, config, model) {

    var c = function (dt) {

        var self = this;
        self.set =  typeof dt !== 'undefined' && typeof dt.CreateSet !== 'undefined' ? dt.CreateSet() : null;
        self.MaterializeProducts = function(data, event) {
            data.MaterializeProducts().done(function () {

            }).fail(function(jqxhr, textStatus, error) {
                if (typeof config.alert === 'function') {
                    config.alert(jqxhr.statusText + '\r\n\r\n' + jqxhr.responseText);
                } else {
                    alert(jqxhr.statusText + '\r\n\r\n' + jqxhr.responseText);
                }
            });
        };

        self.LoadHomePage = function (data, event) {
            data.LoadEntityHomePage().done(function () {

            }).fail(function(jqxhr, textStatus, error) {
                if (typeof config.alert === 'function') {
                    config.alert(jqxhr.statusText + '\r\n\r\n' + jqxhr.responseText);
                } else {
                    alert(jqxhr.statusText + '\r\n\r\n' + jqxhr.responseText);
                }
            });
        };

        self.initialize = function (SupplierID) {
            pageMgr.loadedModelTable['service-clients/scripts/Northwind/models/sets/Supplier'] = model;
            if (self.set == null)
                self.set = new model.entitySet();
            return self.set.LoadEntityByKey(SupplierID, true);
        };
    }
    return c;
})