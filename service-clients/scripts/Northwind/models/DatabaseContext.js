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

define(['knockout', 'config', 'structs' ], function (ko, config, ds) {

    var changeMonitor = function () {
        var self = this;
        self.showDetails = ko.observable(false);
        self.maxItems = ko.observable(config.maxChangeLogEntries);
        self.msgs = ko.observableArray([]);
    };

    var c = function (data) {
        var self = this;
        self.data = data;
        self.monitor = new changeMonitor();
        self.IsDBUserPersistable = ko.observable(data.IsDBUserPersistable);
        self.IsDBUserLoaded = ko.observable(data.IsDBUserLoaded);
        self.rootEntities = [];
        if (data.RootEntities !== null) {
            for (var i = 0; i < data.RootEntities.length; i++) {
                self.rootEntities.push(new ds.rootEntity(data.RootEntities[i]));
            }
        }
        self.entitySets = [ 'Categories', 'CustomerCustomerDemo', 'CustomerDemographics', 'Customers', 'Employees', 'EmployeeTerritories', 'Order Details', 'Orders', 'Products', 'Region', 'Shippers', 'Suppliers', 'Territories' ]
        self.Categorys = data.Categorys;
        self.CustomerDemographics = data.CustomerDemographics;
        self.Customers = data.Customers;
        self.Employees = data.Employees;
        self.Regions = data.Regions;
        self.Shippers = data.Shippers;
        self.Suppliers = data.Suppliers;
        self.IsDatabaseReady = ko.pureComputed(function () {
            return self.Categorys.DoesSetExist && self.CustomerDemographics.DoesSetExist && self.Customers.DoesSetExist && self.Employees.DoesSetExist && self.Regions.DoesSetExist && self.Shippers.DoesSetExist && self.Suppliers.DoesSetExist;
        });

        self.CreateDatabase = function () {
            return $.ajax({
                url: config.baseUrl + "/services/Northwind/DbContext/CreateDatabase",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ })
            }).pipe(
                function () {
                    return $.Deferred().resolve(ok);
                },
                function (jqxhr, textStatus, error) {
                    return $.Deferred().reject(jqxhr, textStatus, error);
                }            
            );
        };

        self.LoadDatabase = function () {
            return $.ajax({
                url: config.baseUrl + "/services/Northwind/DbContext/LoadDatabase",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ })
            }).pipe(
                function (ok) {
                    self.IsDBUserLoaded(ok);
                    return $.Deferred().resolve( { ok: ok } );
                },
                function (jqxhr, textStatus, error) {
                    return $.Deferred().reject(jqxhr, textStatus, error);
                }            
            );
        };

        self.SaveDatabase = function () {
            return $.ajax({
                url: config.baseUrl + "/services/Northwind/DbContext/SaveDatabase",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ })
            }).pipe(
                function () {
                    return $.Deferred().resolve(ok);
                },
                function (jqxhr, textStatus, error) {
                    return $.Deferred().reject(jqxhr, textStatus, error);
                }            
            );
        };
    };
    return c;
})