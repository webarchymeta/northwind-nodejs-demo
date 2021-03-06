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

    var c = function () {

        var self = this;

        self.initialize = function() {
            pageMgr.loadedModelTable['service-clients/scripts/Northwind/models/DatabaseContext'] = model;
            return $.ajax({
                url: config.baseUrl + "/services/Northwind/DbContext/GetDatabaseInfo",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ })
            }).pipe(
                function(dbinfo) {
                    return $.Deferred().resolve(new model(dbinfo));
                },
                function (jqxhr, textStatus, error) {
                    return $.Deferred().reject(jqxhr, textStatus, error);
                }            
            );
        };

    }
    return c;
})