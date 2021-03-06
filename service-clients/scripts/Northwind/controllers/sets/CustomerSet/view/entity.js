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
        self.MaterializeCustomerCustomerDemos = function(data, event) {
            data.MaterializeCustomerCustomerDemos().done(function () {

            }).fail(function(jqxhr, textStatus, error) {
                if (typeof config.alert === 'function') {
                    config.alert(jqxhr.statusText + '\r\n\r\n' + jqxhr.responseText);
                } else {
                    alert(jqxhr.statusText + '\r\n\r\n' + jqxhr.responseText);
                }
            });
        };

        self.MaterializeOrders = function(data, event) {
            data.MaterializeOrders().done(function () {

            }).fail(function(jqxhr, textStatus, error) {
                if (typeof config.alert === 'function') {
                    config.alert(jqxhr.statusText + '\r\n\r\n' + jqxhr.responseText);
                } else {
                    alert(jqxhr.statusText + '\r\n\r\n' + jqxhr.responseText);
                }
            });
        };

        self.initialize = function (CustomerID) {
            pageMgr.loadedModelTable['service-clients/scripts/Northwind/models/sets/Customer'] = model;
            if (!self.set) {
                self.set = new model.entitySet();
            }
            return self.set.LoadEntityByKey(CustomerID, true);
        };
    }
    return c;
})