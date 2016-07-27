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

var root = process.cwd(), 
    apppath = typeof global.appPath === 'undefined' || global.appPath === '' ? '' : 'config/' + global.appPath + '/',
    path = require('path'),
    edge = require(path.join(root, 'node_modules/edge')),
    events = require(path.join(root, 'node_modules/events')),
    B = require(path.join(root, 'node_modules/bluebird')),
    _ = require(path.join(root,'node_modules/lodash')),
    config = require(path.join(root, apppath + 'config')),
    appcontext = require(path.join(root, apppath + 'app-context'));

var api = function () {
    var self = this;
    var cntx = global.NorthwindClientContext;

    /**
      * Attach to the underlying relational database engine.
      */
    self.AttachDataEngine = function (input) {
        var __promise = new B(function (resolve, reject) {
            var opts = {
                connectString: typeof input === 'undefined' || typeof input.connectString === 'undefined' ? null : input.connectString,
                textResourceDir: input.textResourceDir,
                luceneIndicesBasePath: input.luceneIndicesBasePath
            };
            self._AttachDataEngine(opts, function (error, result) {
                if (!error) {
                    var returnObj;
                    try {
                        returnObj = JSON.parse(result);
                    } catch (ex) {
                        var c = result.charCodeAt(result.length - 1);
                        if (c === 1) { // in the rare case that the SOH character is not stripped.
                            result = result.substr(0, result.length - 1);
                            returnObj = JSON.parse(result);
                        } else {
                            reject('failed!!!');
                            return;
                        }
                    }
                    resolve(returnObj);
                } else {
                    reject(error);
                }
            });
        });
        return __promise;
    };


    /**
     * <summary>
     *   Sign in the service for relational database "Northwind" and authenticate the identity of the caller. 
     * Depending on the end points, the authentication may have been delegated to the host. E.g., the end point serving javascript
     * requests are delegated to Asp.Net website authentication system. For other end points, the caller must provide correct credentials
     * in order to have permission to continue the call processing.
     * </summary>
     * <remarks>
     *   Note: The current version of the system does not check for credentials. It also does not validate the returned caller context object. 
     * Therefore care must be taken to limit the access to the service to trusted nodes or users within a secured network environment.
     * </remarks>
     * <param name="cntx">Caller supplied and initialized caller context. If it is null, the service will create an initial one.</param>
     * <param name="credentials">Caller credential information.</param>
     * <returns>
     *   An initialized caller context object used for subsequent API calls. Supplying an invalid caller context will
     * result in a deny of the service.
     * </returns>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/NorthwindService?db=Northwind&subdoc=SignInService"
}
*/
    self.SignInService = function (input) {
        var __promise = new B(function (resolve, reject) {
            var opts = {
                cntx: JSON.stringify(config.mapCntx(input.cntx || cntx)),
                credentials: typeof input.credentials === 'undefined' ? null : JSON.stringify(input.credentials)
            };
            self._SignInService(opts, function (error, result) {
                if (!error) {
                    var returnObj;
                    try {
                        returnObj = JSON.parse(result);
                    } catch (ex) {
                        var c = result.charCodeAt(result.length - 1);
                        if (c === 1) { // in the rare case that the SOH character is not stripped.
                            result = result.substr(0, result.length - 1);
                            returnObj = JSON.parse(result);
                        } else {
                            reject('failed!!!');
                            return;
                        }
                    }
                    resolve(returnObj);
                } else {
                    reject(error);
                }
            });
        });
        return __promise;
    };

    /**
     * <summary>
     * Register a subscription to notification of data source changes.
     * </summary>
     * <param name="cntx">Caller supplied and initialized caller context. If it is null, the service will create an initial one.</param>
     * <param name="ownerID">An identifier for a "user" that owns the subscription. An owner can change or un-subscribe an subscription.</param>
     * <param name="subscribeID">An identifier that the client use to keep track of its subscriptions.</param>
     * <param name="sets">A list of data sets and optional corresponding entity filters that the server uses to notify client of changes. If it is set to null, then change notifications 
     * about all data sets will be sent to the client.</param>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/NorthwindService?db=Northwind&subdoc=SubscribeToUpdates"
}
*/
    self.SubscribeToUpdates = function (input) {
        var __promise = new B(function (resolve, reject) {
            var evt = new events.EventEmitter();
            var opts = {
                cntx: JSON.stringify(config.mapCntx(input.cntx || cntx)),
                ownerID: input.ownerId,
                subscriberID: input.subscriberId,
                preserve: input.preserve, 
                sets: typeof input.sets === 'undefined' ? undefined : JSON.stringify(input.sets),
                changed: function(e) {
                    evt.emit('dataChange', JSON.parse(e));
                }
            };
            self._SubscribeToUpdates(opts, function (error, result) {
                if (!error) {
                    if (typeof global.service_event_subscribers === 'undefined') {
                        global.service_event_subscribers = [];
                        var sub = undefined;
                    } else {
                        var sub = _.find(global.service_event_subscribers, function (s) { return s.id === input.subscriberId });
                    }
                    if (!sub) {
                        global.service_event_subscribers.push({ id: input.subscriberId, e: evt });
                    } else {
                        sub.e = evt;
                    }
                    resolve(evt);
                } else {
                    reject(error);
                }
            });
        });
        return __promise;
    };


    /**
     * <summary>
     * un-register a subscription to data source change notifications.
     * </summary>
     * <param name="cntx">Caller supplied and initialized caller context. If it is null, the service will create an initial one.</param>
     * <param name="ownerID">An identifier for a "user" that owns the subscription. An owner can change or un-subscribe an subscription.</param>
     * <param name="subscribeID">An identifier that the client use to keep track of its subscriptions.</param>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/NorthwindService?db=Northwind&subdoc=UnsubscribeToUpdates"
}
*/
    self.UnsubscribeToUpdates = function (input) {
        var __promise = new B(function (resolve, reject) {
            var opts = {
                cntx: JSON.stringify(config.mapCntx(input.cntx || cntx)),
                ownerID: input.ownerId,
                subscriberID: input.subscriberId,
                preserve: input.preserve
            };
            self._UnsubscribeToUpdates(opts, function (error, result) {
                if (!error) {
                    var idx = -1;
                    if (typeof global.service_event_subscribers !== 'undefined') {
                        for (var i = 0, len = global.service_event_subscribers.length; i < len; i++) {
                            if (global.service_event_subscribers[i].id === input.subscriberId) {
                                idx = i;
                                break;
                            }
                        }
                    }
                    if (idx !== -1) {
                        var sub = global.service_event_subscribers[idx];
                        resolve(sub.e);
                        global.service_event_subscribers.splice(idx, 1);
                    } else {
                        resolve(undefined);
                    }
                } else {
                    reject(error);
                }
            });
        });
        return __promise;
    };

    self.ClearCaches = function (input) {
        var __promise = new B(function (resolve, reject) {
            var opts = {
                cntx: JSON.stringify(config.mapCntx(input.cntx || cntx)),
                dumpAll: input.dumpAll || false 
            };
            self._ClearCaches(opts, function (error, result) {
                if (!error) {
                    resolve();
                } else {
                    reject(error);
                }
            });
        });
        return __promise;
    };

    /**
     * <summary>
     *   Retrieve information about the database. 
     * </summary>
     * <param name="cntx">Authenticated caller context object. If cannot be null.</param>
     * <returns>
     *   Brief information about current database.
     * </returns>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/NorthwindService?db=Northwind&subdoc=GetDatabaseInfo"
}
*/
    self.GetDatabaseInfo = function (input) {
        var __promise = new B(function (resolve, reject) {
            var opts = {
                cntx: JSON.stringify(config.mapCntx(input.cntx || cntx))
            };
            self._GetDatabaseInfo(opts, function (error, result) {
                if (!error) {
                    var returnObj;
                    try {
                        returnObj = JSON.parse(result);
                    } catch (ex) {
                        var c = result.charCodeAt(result.length - 1);
                        if (c === 1) { // in the rare case that the SOH character is not stripped.
                            result = result.substr(0, result.length - 1);
                            returnObj = JSON.parse(result);
                        } else {
                            reject('failed!!!');
                            return;
                        }
                    }
                    resolve(returnObj);
                } else {
                    reject(error);
                }
            });
        });
        return __promise;
    };


    /**
     * <summary>
     *   If the targeting database does not exist or is an empty one, create the database and/or the tables and other constructs. 
     * </summary>
     * <remarks>
     *   Depending on the type of the relational data source attached, this method may not be relevent. 
     * For real relational database stores, it is safer to create an empty database named "Northwind" inside the targeting database server and
     * then call this method to create the tables and other constructs.
     * </remarks>
     * <param name="cntx">Authenticated caller context object. If cannot be null.</param>
     * <returns>
     *   Whether or not the call is successful.
     * </returns>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/NorthwindService?db=Northwind&subdoc=CreateDatabase"
}
*/
    self.CreateDatabase = function (input) {
        var __promise = new B(function (resolve, reject) {
            var opts = {
                cntx: JSON.stringify(config.mapCntx(input.cntx || cntx))
            };
            self._CreateDatabase(opts, function (error, result) {
                if (!error) {
                    var returnObj;
                    try {
                        returnObj = JSON.parse(result);
                    } catch (ex) {
                        var c = result.charCodeAt(result.length - 1);
                        if (c === 1) { // in the rare case that the SOH character is not stripped.
                            result = result.substr(0, result.length - 1);
                            returnObj = JSON.parse(result);
                        } else {
                            reject('failed!!!');
                            return;
                        }
                    }
                    resolve(returnObj);
                } else {
                    reject(error);
                }
            });
        });
        return __promise;
    };


    /**
     * <summary>
     *   Load persisted database information from local storage. 
     * </summary>
     * <remarks>
     *   Depending on the type of the relational data source attached, this method may not be relevant. 
     * For self loading relational data stores, calling this method will not have any effect.
     * </remarks>
     * <param name="cntx">Authenticated caller context object. If cannot be null.</param>
     * <param name="basePath">The path from where the database will be loaded. The default path is the "App_Data" directory
     * under the <see cref="System.Web.Hosting.HostingEnvironment.ApplicationPhysicalPath" />, if it is available to the hosting environment.</param>
     * <returns>
     *   Whether or not the call is successful.
     * </returns>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/NorthwindService?db=Northwind&subdoc=LoadDatabase"
}
*/
    self.LoadDatabase = function (input) {
        var __promise = new B(function (resolve, reject) {
            var opts = {
                cntx: JSON.stringify(config.mapCntx(input.cntx || cntx)),
                basePath: typeof input.basePath === 'undefined' ? null : input.basePath
            };
            self._LoadDatabase(opts, function (error, result) {
                if (!error) {
                    var returnObj;
                    try {
                        returnObj = JSON.parse(result);
                    } catch (ex) {
                        var c = result.charCodeAt(result.length - 1);
                        if (c === 1) { // in the rare case that the SOH character is not stripped.
                            result = result.substr(0, result.length - 1);
                            returnObj = JSON.parse(result);
                        } else {
                            reject('failed!!!');
                            return;
                        }
                    }
                    resolve(returnObj);
                } else {
                    reject(error);
                }
            });
        });
        return __promise;
    };


    /**
     * <summary>
     *   Save database information to local storage. 
     * </summary>
     * <remarks>
     *   Depending on the type of the relational data source attached, this method may not be relevant. 
     * For self loading relational data stores, calling this method will not have any effect.
     * </remarks>
     * <param name="cntx">Authenticated caller context object. If cannot be null.</param>
     * <param name="basePath">The path from where the database will be saved.The default path is the "App_Data" directory
     * under the <see cref="System.Web.Hosting.HostingEnvironment.ApplicationPhysicalPath" />, if it is available to the hosting environment.</param>
     * <returns>
     *   Whether or not the call is successful.
     * </returns>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/NorthwindService?db=Northwind&subdoc=SaveDatabase"
}
*/
    self.SaveDatabase = function (input) {
        var __promise = new B(function (resolve, reject) {
            var opts = {
                cntx: JSON.stringify(config.mapCntx(input.cntx || cntx)),
                basePath: typeof input.basePath === 'undefined' ? null : input.basePath
            };
            self._SaveDatabase(opts, function (error, result) {
                if (!error) {
                    var returnObj;
                    try {
                        returnObj = JSON.parse(result);
                    } catch (ex) {
                        var c = result.charCodeAt(result.length - 1);
                        if (c === 1) { // in the rare case that the SOH character is not stripped.
                            result = result.substr(0, result.length - 1);
                            returnObj = JSON.parse(result);
                        } else {
                            reject('failed!!!');
                            return;
                        }
                    }
                    resolve(returnObj);
                } else {
                    reject(error);
                }
            });
        });
        return __promise;
    };
};

var assemblyPath = path.join(global.NorthwindServerPath, 'NorthwindServiceAPI.NodeJS.dll');

api.prototype._AttachDataEngine = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.NorthwindNodeJsApi',
    methodName: 'AttachDataEngine'
});

api.prototype._SignInService = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.NorthwindNodeJsApi',
    methodName: 'SignInService'
});

api.prototype._SubscribeToUpdates = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.NorthwindNodeJsApi',
    methodName: 'SubscribeToUpdates'
});

api.prototype._UnsubscribeToUpdates = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.NorthwindNodeJsApi',
    methodName: 'UnsubscribeToUpdates'
});

api.prototype._ClearCaches = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.NorthwindNodeJsApi',
    methodName: 'ClearCaches'
});

api.prototype._GetDatabaseInfo = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.NorthwindNodeJsApi',
    methodName: 'GetDatabaseInfo'
});

api.prototype._CreateDatabase = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.NorthwindNodeJsApi',
    methodName: 'CreateDatabase'
});

api.prototype._LoadDatabase = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.NorthwindNodeJsApi',
    methodName: 'LoadDatabase'
});

api.prototype._SaveDatabase = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.NorthwindNodeJsApi',
    methodName: 'SaveDatabase'
});

module.exports = api;
