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
    Q = require(path.join(root, 'node_modules/q')),
    propFilters = require(path.join(root, '../services/adapters/proxies/Northwind/api/property-filters')),
    config = require(path.join(root, apppath + 'config'));

var api = function () {
    var self = this;
    var cntx = global.NorthwindClientContext;

    /**
     * <summary>
     *   Retrieve information about the entity set: "Suppliers". 
     * </summary>
     * <param name="cntx">Authenticated caller context object. If cannot be null.</param>
     * <param name="filter">Filter expression for the current set.</param>
     * <returns>
     *   Entity set: <see cref="SupplierSet" /> data model.
     * </returns>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/sets/SupplierServiceInputParams?db=Northwind&subdoc=GetSetInfo"
}
*/
    self.GetSetInfo = function (input) {
        var __promise = new Q.Promise(function (resolve, reject, notify) {
            var opts = {
                cntx: JSON.stringify(typeof input.cntx === 'undefined' || !input.cntx ? cntx : input.cntx),
                filter: input.filter
            };
            self._GetSetInfo(opts, function (error, result) {
                if (!error)
                    resolve(JSON.parse(result));
                else
                    reject(error);
            });
        });
        return __promise;
    };

    /**
     * <summary>
     *   Add or update a set of entities to the entity set. 
     * </summary>
     * <param name="cntx">Authenticated caller context object. If cannot be null.</param>
     * <param name="set">The current entity set.</param>
     * <param name="entities">The list of entities to be processed.</param>
     * <remarks>
     *  <para>
     *  The list of entities will be checked against existing ones inside the entity set. An entity is identified by a set of "intrinsic identitfiers" selected
     *  when the system is generated. They are not necessarily the same as primary keys of the set. An auto generated primary key can not be
     *  used as an "intrinsic identitfier". An entity having the same set of "intrinsic identitfiers" can not be added to the database. They will be treated 
     *  as an entity update if the client load the entity first before modifying it, otherwise (namely if the client created the entity on the client side),
     *  the update will be rejected unless the client set the <see cref="CallContext.OverrideExisting" /> property  of "cntx" to <c>true</c>. </para>
     *  <para>
     *  Note: entities having no "intrinsic identitfier" will always be treated as different entities in add operations. 
     *  </para>
     *  <para>
     *  Note 2: A persisted entity (namely the one loaded
     *  from the data set) will be ignored in if none of its editable properties (set before system generation, see
     *  <see cref="Supplier" />) is modified or its <see cref="Supplier.IsEntityChanged" /> property is
     *  not set to <c>true</c>. 
     *  </para>
     *  <para>
     *  Clients can also create and add to member collections in { <see cref="Supplier.ChangedProducts" /> } entities that depends on an currently added or updated entity. These 
     *  additional entities will be add or updated to the data source following the same logic, all the object relationships will be properly setup if the operation is successful.
     *  </para>
     *  <para>
     *  In general, a client can construct an object graph of any complexity following the above rules and have it added or updated to the data source in one step.
     *  </para>
     * </remarks>
     * <returns>
     *   Operation result contained inside an object of type <see cref="ChangeOpResults{T}" /> which contains operation messages, if any, and a list of successfully added or updated entities.
     * </returns>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/sets/SupplierServiceInputParams?db=Northwind&subdoc=AddOrUpdateEntities"
}
*/
    self.AddOrUpdateEntities = function (input) {
        var __promise = new Q.Promise(function (resolve, reject, notify) {
            var opts = {
                cntx: JSON.stringify(typeof input.cntx === 'undefined' || !input.cntx ? cntx : input.cntx),
                set: JSON.stringify(input.set),
                entities: JSON.stringify(input.entities)
            };
            self._AddOrUpdateEntities(opts, function (error, result) {
                if (!error)
                    resolve(JSON.parse(result));
                else
                    reject(error);
            });
        });
        return __promise;
    };

    /**
     * <summary>
     *   Queue a set of entities to be added or updated to the entity set in a certain preset future time. 
     * </summary>
     * <param name="cntx">Authenticated caller context object. If cannot be null.</param>
     * <param name="set">The current entity set.</param>
     * <param name="entities">The list of entities to be processed.</param>
     * <remarks>
     *  <para>
     *  The processing will be delayed to be started at a certain future time. If there are any further calls to this method during the wait period, the new sets will be 
     *  merged with existing ones inside the queue. This method is useful when there are repetitive updates to the entity set but the actual change history is not of 
     *  interest to the client, namely only the last snapshot of the changes are relevant. In this case, the method can reduce the loads on the backend data source 
     *  significantly.
     *  </para>
     *  <para>
     *  The list of entities will be checked against existing ones inside the entity set when the processing starts. An entity is identified by a set of "intrinsic identitfiers" selected
     *  when the system is generated. They are not necessarily the same as primary keys of the set. An auto generated primary key can not be
     *  used as an "intrinsic identitfier". An entity having the same set of "intrinsic identitfiers" can not be added to the database. They will be treated 
     *  as an entity update if the client load the entity first before modifying it, otherwise (namely if the client created the entity on the client side), 
     *  the update will be rejected unless the client set the <c>OverrideExisting</c> property  of "cntx" to <c>true</c>. 
     *  </para>
     *  <para>
     *  Note: entities having no "intrinsic identitfier" will always be treated as different entities in add or update operations, namely they will always be added to the set.
     *  </para>
     *  <para>
     *  Note 2: A persisted entity (namely the one loaded
     *  from the data set) will be ignored in if none of its editable properties (set before system generation, see
     *  <see cref="Supplier" />) is modified or its <see cref="Supplier.IsEntityChanged" /> property is
     *  not set to <c>true</c>. 
     *  </para>
     *  <para>
     *  Warning: Please do not use this method when new entities are to be added and information about these updated enitities, like auto generated primary keys, are needed for 
     *  proceeding to the next steps.
     *  </para>
     *  <para>
     *  Clients can set some of the member entities in { <see cref="Supplier.ChangedProducts" /> } that an currently added or updated entity depends upon. These additional entities will be 
     *  add or updated to the data source following the same logic, all the object relationships will be properly setup if the operation is successful.
     *  </para>
     *  <para>
     *  In general, a client can construct an object graph of any complexity following the above rules and have it added or updated to the data source in one step.
     *  </para>
     * </remarks>
     * <returns>
     * </returns>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/sets/SupplierServiceInputParams?db=Northwind&subdoc=EnqueueNewOrUpdateEntities"
}
*/
    self.EnqueueNewOrUpdateEntities = function (input) {
        var __promise = new Q.Promise(function (resolve, reject, notify) {
            var opts = {
                cntx: JSON.stringify(typeof input.cntx === 'undefined' || !input.cntx ? cntx : input.cntx),
                set: JSON.stringify(input.set),
                entities: JSON.stringify(input.entities)
            };
            self._EnqueueNewOrUpdateEntities(opts, function (error, result) {
                if (!error)
                    resolve(JSON.parse(result));
                else
                    reject(error);
            });
        });
        return __promise;
    };

    /**
     * <summary>
     *  Delete a set of entities from the entity set, together with all their dependents, recursively. 
     * </summary>
     * <param name="cntx">Authenticated caller context object. If cannot be null.</param>
     * <param name="set">The current entity set.</param>
     * <param name="entities">The list of entities to be processed.</param>
     * <remarks>
     *  <para>
     *   Care should be taken when deleting an entire inter-dependent object sub-graph.
     *  </para>
     * </remarks>
     * <returns>
     *   Operation result contained inside an object of type <see cref="OperationResults" /> which contains operation messages, if any.
     * </returns>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/sets/SupplierServiceInputParams?db=Northwind&subdoc=DeleteEntities"
}
*/
    self.DeleteEntities = function (input) {
        var __promise = new Q.Promise(function (resolve, reject, notify) {
            var opts = {
                cntx: JSON.stringify(typeof input.cntx === 'undefined' || !input.cntx ? cntx : input.cntx),
                set: JSON.stringify(input.set),
                entities: JSON.stringify(input.entities)
            };
            self._DeleteEntities(opts, function (error, result) {
                if (!error)
                    resolve(JSON.parse(result));
                else
                    reject(error);
            });
        });
        return __promise;
    };

    /**
     * <summary>
     *   Get a block of page frames from the entity set "Suppliers" of the data source under specified filtering and sorting conditions. 
     * </summary>
     * <remarks>
     * The page size and the page block size is specified inside "set".
     * </remarks>
     * <param name="cntx">Authenticated caller context object. If cannot be null.</param>
     * <param name="set">Set information.</param>
     * <param name="qexpr">Tokenized querying and sorting expression.</param>
     * <param name="prevlast">The last entity inside the previous page block. For the first page block, it is set to null value.</param>
     * <returns>
     *   <see cref="SupplierPageBlock" /> data model for entity set "Suppliers".
     * </returns>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/sets/SupplierServiceInputParams?db=Northwind&subdoc=NextPageBlock"
}
*/

    self.NextPageBlock = function (input) {
        var __promise = new Q.Promise(function (resolve, reject, notify) {
            var opts = {
                cntx: JSON.stringify(typeof input.cntx === 'undefined' || !input.cntx ? cntx : input.cntx),
                set: JSON.stringify(input.set),
                qexpr: JSON.stringify(input.qexpr),
                prevlast: JSON.stringify(input.prevlast)
            };
            self._NextPageBlock(opts, function (error, result) {
                if (!error)
                    resolve(JSON.parse(result));
                else
                    reject(error);
            });
        });
        return __promise;
    };

    /**
     * <summary>
     *   Load entities of a page from the entity set "Suppliers" of the data source under specified filtering and sorting conditions. 
     * </summary>
     * <remarks>
     * The page size is specified inside "set".
     * </remarks>
     * <param name="cntx">Authenticated caller context object. If cannot be null.</param>
     * <param name="set">Set information.</param>
     * <param name="qexpr">Tokenized querying and sorting expression.</param>
     * <param name="prevlast">The last entity inside the previous page. For the first page, it is set to null value.</param>
     * <returns>
     *   Collection of <see cref="Supplier" /> in set "Suppliers" for the current page defined by "prevlast".
     * </returns>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/sets/SupplierServiceInputParams?db=Northwind&subdoc=GetPageItems"
}
*/
    self.GetPageItems = function (input) {
        var __promise = new Q.Promise(function (resolve, reject, notify) {
            var opts = {
                cntx: JSON.stringify(typeof input.cntx === 'undefined' || !input.cntx ? cntx : input.cntx),
                set: JSON.stringify(input.set),
                qexpr: JSON.stringify(input.qexpr),
                prevlast: JSON.stringify(input.prevlast)
            };
            self._GetPageItems(opts, function (error, result) {
                if (!error)
                {
                    var cntx = JSON.parse(opts.cntx);
                    if ((typeof cntx.allProperties === 'undefined' || !cntx.allProperties) && (config.disablePropertyFiltering === 'undefined' || !config.disablePropertyFiltering) && typeof propFilters['Supplier'] !== 'undefined')
                        resolve(propFilters['Supplier'].many(JSON.parse(result), false));
                    else
                        resolve(JSON.parse(result));
                }
                else
                    reject(error);
            });
        });
        return __promise;
    };

    /**
     * <summary>
     *   Count the number of entities inside entity set "Suppliers" of the data source under specified filtering condition. 
     * </summary>
     * <param name="cntx">Authenticated caller context object. If cannot be null.</param>
     * <param name="set">Set information.</param>
     * <param name="qexpr">Tokenized querying and sorting expression.</param>
     * <returns>
     *   The number of entities.
     * </returns>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/sets/SupplierServiceInputParams?db=Northwind&subdoc=QueryEntityCount"
}
*/

    self.QueryEntityCount = function (input) {
        var __promise = new Q.Promise(function (resolve, reject, notify) {
            var opts = {
                cntx: JSON.stringify(typeof input.cntx === 'undefined' || !input.cntx ? cntx : input.cntx),
                set: JSON.stringify(input.set),
                qexpr: JSON.stringify(input.qexpr)
            };
            self._QueryEntityCount(opts, function (error, result) {
                if (!error)
                    resolve(JSON.parse(result));
                else
                    reject(error);
            });
        });
        return __promise;
    };

    /**
     * <summary>
     *   Get the collection of entities of type <see cref="Supplier" /> inside entity set "Suppliers" of the data source under specified filtering and sorting conditions. 
     * </summary>
     * <param name="cntx">Authenticated caller context object. If cannot be null.</param>
     * <param name="set">Set information.</param>
     * <param name="qexpr">Tokenized querying and sorting expression.</param>
     * <returns>
     *   The collection of entities.
     * </returns>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/sets/SupplierServiceInputParams?db=Northwind&subdoc=QueryDatabase"
}
*/
    self.QueryDatabase = function (input) {
        var __promise = new Q.Promise(function (resolve, reject, notify) {
            var opts = {
                cntx: JSON.stringify(typeof input.cntx === 'undefined' || !input.cntx ? cntx : input.cntx),
                set: JSON.stringify(input.set),
                qexpr: JSON.stringify(input.qexpr)
            };
            self._QueryDatabase(opts, function (error, result) {
                if (!error)
                {
                    var cntx = JSON.parse(opts.cntx);
                    if ((typeof cntx.allProperties === 'undefined' || !cntx.allProperties) && (config.disablePropertyFiltering === 'undefined' || !config.disablePropertyFiltering) && typeof propFilters['Supplier'] !== 'undefined')
                        resolve(propFilters['Supplier'].many(JSON.parse(result), false));
                    else
                        resolve(JSON.parse(result));
                }
                else
                    reject(error);
            });
        });
        return __promise;
    };

    /**
     * <summary>
     *   Get the collection of entities of type <see cref="Supplier" /> inside entity set "Suppliers" from the data source under specified filtering, sorting and max number of returning entities conditions. 
     * </summary>
     * <param name="cntx">Authenticated caller context object. If cannot be null.</param>
     * <param name="set">Set information.</param>
     * <param name="qexpr">Tokenized querying and sorting expression.</param>
     * <param name="maxRecords">Max number of entities to return.</param>
     * <returns>
     *   The collection of entities.
     * </returns>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/sets/SupplierServiceInputParams?db=Northwind&subdoc=QueryDatabaseLimited"
}
*/
    self.QueryDatabaseLimited = function (input) {
        var __promise = new Q.Promise(function (resolve, reject, notify) {
            var opts = {
                cntx: JSON.stringify(typeof input.cntx === 'undefined' || !input.cntx ? cntx : input.cntx),
                set: JSON.stringify(input.set),
                qexpr: JSON.stringify(input.qexpr),
                maxRecords: input.maxRecords
            };
            self._QueryDatabaseLimited(opts, function (error, result) {
                if (!error)
                {
                    var cntx = JSON.parse(opts.cntx);
                    if ((typeof cntx.allProperties === 'undefined' || !cntx.allProperties) && (config.disablePropertyFiltering === 'undefined' || !config.disablePropertyFiltering) && typeof propFilters['Supplier'] !== 'undefined')
                        resolve(propFilters['Supplier'].many(JSON.parse(result), false));
                    else
                        resolve(JSON.parse(result));
                }
                else
                    reject(error);
            });
        });
        return __promise;
    };

    /**
     * <summary>
     *   Load the set of depending entities "Products" of type <see cref="ProductSet" /> of the entity. 
     * </summary>
     * <param name="cntx">Authenticated caller context object. If cannot be null.</param>
     * <param name="entity">The entity.</param>
     * <remarks>
     *  The set returned is a filtered subset whose members are all depending on the entity.
     * </remarks>
     * <returns>
     *   An entity of type <see cref="ProductSet" />.
     * </returns>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/sets/SupplierServiceInputParams?db=Northwind&subdoc=MaterializeProducts"
}
*/
    self.MaterializeProducts = function (input) {
        var __promise = new Q.Promise(function (resolve, reject, notify) {
            var opts = {
                cntx: JSON.stringify(typeof input.cntx === 'undefined' || !input.cntx ? cntx : input.cntx),
                entity: JSON.stringify(input.entity)
            };
            self._MaterializeProducts(opts, function (error, result) {
                if (!error)
                    resolve(JSON.parse(result));
                else
                    reject(error);
            });
        });
        return __promise;
    };

    /**
     * <summary>
     *   Load the collection of depending entities "AllProducts" of type <see cref="IEnumerable{Product}" /> (T = <see cref="Product" />) of the entity. 
     * </summary>
     * <param name="cntx">Authenticated caller context object. If cannot be null.</param>
     * <param name="entity">The entity.</param>
     * <returns>
     *   An collecton of type <see cref="IEnumerable{Product}" /> (T = <see cref="Product" />).
     * </returns>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/sets/SupplierServiceInputParams?db=Northwind&subdoc=MaterializeAllProducts"
}
*/
    self.MaterializeAllProducts = function (input) {
        var __promise = new Q.Promise(function (resolve, reject, notify) {
            var opts = {
                cntx: JSON.stringify(typeof input.cntx === 'undefined' || !input.cntx ? cntx : input.cntx),
                entity: JSON.stringify(input.entity)
            };
            self._MaterializeAllProducts(opts, function (error, result) {
                if (!error)
                {
                    var cntx = JSON.parse(opts.cntx);
                    if ((typeof cntx.allProperties === 'undefined' || !cntx.allProperties) && (config.disablePropertyFiltering === 'undefined' || !config.disablePropertyFiltering) && typeof propFilters['Product'] !== 'undefined')
                        resolve(propFilters['Product'].many(JSON.parse(result), false));
                    else
                        resolve(JSON.parse(result));
                }
                else
                    reject(error);
            });
        });
        return __promise;
    };

    /**
     * <summary>
     *  Load an entity from the entity set having specified primary key(s): { <see cref="Supplier.SupplierID" /> }. 
     * </summary>
     * <param name="cntx">Authenticated caller context object. If cannot be null.</param>
    /// <param name="_SupplierID">Primary key <see cref="Supplier.SupplierID" />.</param>
     * <returns>
     *   Null or the entity found.
     * </returns>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/sets/SupplierServiceInputParams?db=Northwind&subdoc=LoadEntityByKey"
}
*/
    self.LoadEntityByKey = function (input) {
        var __promise = new Q.Promise(function (resolve, reject, notify) {
            var opts = {
                cntx: JSON.stringify(typeof input.cntx === 'undefined' || !input.cntx ? cntx : input.cntx),
                _SupplierID: input._SupplierID || input.SupplierID
            };
            self._LoadEntityByKey(opts, function (error, result) {
                if (!error)
                {
                    var cntx = JSON.parse(opts.cntx);
                    if ((typeof cntx.allProperties === 'undefined' || !cntx.allProperties) && (config.disablePropertyFiltering === 'undefined' || !config.disablePropertyFiltering) && typeof propFilters['Supplier'] !== 'undefined')
                        resolve(propFilters['Supplier'].one(JSON.parse(result), false));
                    else
                        resolve(JSON.parse(result));
                }
                else
                    reject(error);
            });
        });
        return __promise;
    };

    /**
     * <summary>
     *  Load a selected entity graph from the data source starting at an entity having specified primary key(s): { <see cref="Supplier.SupplierID" /> }. . It is designed to be called by clients other than .Net native ones.
     * </summary>
     * <param name="cntx">Authenticated caller context object. If cannot be null.</param>
    /// <param name="_SupplierID">Primary key <see cref="Supplier.SupplierID" />.</param>
     * <param name="excludedSets">A list of sets to be excluded. </param>
     * <param name="futherDrillSets">A list of sets above the entry set that are to be drilled down futher (see the following). </param>
     * <remarks>
     * <para>Relational databases are designed to serve as data query and storage backend, in a normalized way, for certain kind of applications. 
     * However at the application level, normalized elementary data sets are often combined (jointed) in a user friendly way as views. In the object oriented 
     * world and at the data view model level, these views can be represented using entity graphs.</para>
     * <para>This method is designed to load a selected sub entity graph recursively from the data source in one call to the service starting with a given entity (id).
     * It could be used to increase performance and to reduce client code complexity, sometimes significantly.</para>
     * <para>The selection is controlled by two parameters, namely <paramref name="excludedSets" /> and <paramref name="futherDrillSets" />.</para>
     * <para>The <paramref name="excludedSets" /> parameter is used to exclude a list of entity sets and all other sets that depend on it. This can be
     * better understood if one has a look at the schematic view of the data set schema that is shown on the front page of the data service, namely
     * if one date set (node) is excluded then all the sets that it points to will not be reached through it, although some of them could still be reached
     * following other routes. </para>
     * <para>There are many ways an entity sub-graph can be loaded, the present implementation is based on the rule to be given next. Namely, starting from 
     * the entry element, it loads all entities that depends on it, recursively downward (namely following the arrows in the schema view). It also loads all 
     * elements that any of the elements visited by the downward recursion depends upon, recursively upward (namely in 
     * the opposite direction of the arrows in the schema view), but never go downward again without explicit instruction.</para>
     * <para>The <paramref name="futherDrillSets" /> parameter is used control when to go downward again, represented by the <see cref="EntitySetRelation.SetType" /> member 
     * and the collection of data sets that depend on it, represented by the <see cref="EntitySetRelation.RelatedSets" /> member, should be further drilled down, recursively.</para>
     * <para>Note that a data service has intrinsic limits that do not allow transmitting an entity graph that is too large in one call, so one has to select which part
     * of the entire graph should be loaded in each call to the data service,</para>
     * <para>For a given entity, the entities that it depends upon are represented by the member objects corresponding to each foreign keys. However, the
     * sets of entities that depend on the said entity are stored into the corresponding collection members having the "Changed" prefix and
     * these entities do not have a back reference to the said entity to avoid circular references when doing serialization, Such back references can be
     * added after the graph is materialized on the clients side, if needed.</para>
     * </remarks>
     * <returns>
     *   Null or the entity graph found.
     * </returns>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/sets/SupplierServiceInputParams?db=Northwind&subdoc=LoadEntityGraphRecursJson"
}
*/
    self.LoadEntityGraphRecursJson = function (input) {
        var __promise = new Q.Promise(function (resolve, reject, notify) {
            var opts = {
                cntx: JSON.stringify(typeof input.cntx === 'undefined' || !input.cntx ? cntx : input.cntx),
                _SupplierID: input._SupplierID || input.SupplierID,
                excludedSets: JSON.stringify(input.excludedSets),
                futherDrillSets: JSON.stringify(input.futherDrillSets)
            };
            self._LoadEntityGraphRecursJson(opts, function (error, result) {
                if (!error)
                    resolve(JSON.parse(result));
                else
                    reject(error);
            });
        });
        return __promise;
    };

    /**
     * <summary>
     *  Load a set entities from the entity set having specified intrinsic ids: { <see cref="Supplier.CompanyName" /> }. 
     * </summary>
     * <param name="cntx">Authenticated caller context object. If cannot be null.</param>
    /// <param name="_CompanyName">Intrinsic id <see cref="Supplier.CompanyName" />.</param>
     * <remarks>
     *  <para>
     *   If the intrinsic identifiers are well chosen, the returned entity set should contain zero or one item. This could not be the case
     *   if the system is attached to an existing database whose data were entered without respecting the rules (namely those entities having the
     *   same set of intrinsic identifiers should appear only once inside the data source) imposed later by the
     *   system.
     *  </para>
     * </remarks>
     * <returns>
     *   The list of found entities.
     * </returns>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/sets/SupplierServiceInputParams?db=Northwind&subdoc=LoadEntityByNature"
}
*/
    self.LoadEntityByNature = function (input) {
        var __promise = new Q.Promise(function (resolve, reject, notify) {
            var opts = {
                cntx: JSON.stringify(typeof input.cntx === 'undefined' || !input.cntx ? cntx : input.cntx),
                    _CompanyName: input._CompanyName || input.CompanyName
            };
            self._LoadEntityByNature(opts, function (error, result) {
                if (!error)
                {
                    var cntx = JSON.parse(opts.cntx);
                    if ((typeof cntx.allProperties === 'undefined' || !cntx.allProperties) && (config.disablePropertyFiltering === 'undefined' || !config.disablePropertyFiltering) && typeof propFilters['Supplier'] !== 'undefined')
                        resolve(propFilters['Supplier'].many(JSON.parse(result), false));
                    else
                        resolve(JSON.parse(result));
                }
                else
                    reject(error);
            });
        });
        return __promise;
    };

    /**
     * <summary>
     *  Load the delay loaded property <see cref="Supplier.HomePage" />. 
     * </summary>
     * <param name="cntx">Authenticated caller context object. If cannot be null.</param>
    /// <param name="_SupplierID">Primary key <see cref="Supplier.SupplierID" />.</param>
     * <remarks>
     * </remarks>
     * <returns>
     *   The value of the property.
     * </returns>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/sets/SupplierServiceInputParams?db=Northwind&subdoc=LoadEntityHomePage"
}
*/
    self.LoadEntityHomePage = function (input) {
        var __promise = new Q.Promise(function (resolve, reject, notify) {
            var opts = {
                cntx: JSON.stringify(typeof input.cntx === 'undefined' || !input.cntx ? cntx : input.cntx),
                _SupplierID: input._SupplierID || input.SupplierID
            };
            self._LoadEntityHomePage(opts, function (error, result) {
                if (!error)
                    resolve(result);
                else
                    reject(error);
            });
        });
        return __promise;
    };

    /**
     * <summary>
     *  Update the delay loaded property <see cref="Supplier.HomePage" />. 
     * </summary>
     * <param name="cntx">Authenticated caller context object. If cannot be null.</param>
    /// <param name="_SupplierID">Primary key <see cref="Supplier.SupplierID" />.</param>
     * <param name="data">The updated value.</param>
     * <remarks>
     * </remarks>
     * <returns>
     *   The value of the property.
     * </returns>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/sets/SupplierServiceInputParams?db=Northwind&subdoc=UpdateEntityHomePage"
}
*/
    self.UpdateEntityHomePage = function (input) {
        var __promise = new Q.Promise(function (resolve, reject, notify) {
            var opts = {
                cntx: JSON.stringify(typeof input.cntx === 'undefined' || !input.cntx ? cntx : input.cntx),
                _SupplierID: input._SupplierID || input.SupplierID,
                data: input.data
            };
            self._UpdateEntityHomePage(opts, function (error, result) {
                if (!error)
                    resolve(JSON.parse(result));
                else
                    reject(error);
            });
        });
        return __promise;
    };

    /**
     * <summary>
     *  Given the current sorter expression <paramref name="sorters" />, it returns the next sorter token options. 
     * </summary>
     * <param name="cntx">Authenticated caller context object. If cannot be null.</param>
     * <param name="sorters">Sorter expression tokens.</param>
     * <returns>
     *   A list of possible sort tokens.
     * </returns>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/sets/SupplierServiceInputParams?db=Northwind&subdoc=GetNextSorterOps"
}
*/
    self.GetNextSorterOps = function (input) {
        var __promise = new Q.Promise(function (resolve, reject, notify) {
            var opts = {
                cntx: JSON.stringify(typeof input.cntx === 'undefined' || !input.cntx ? cntx : input.cntx),
                sorters: JSON.stringify(input.sorters)
            };
            self._GetNextSorterOps(opts, function (error, result) {
                if (!error)
                    resolve(JSON.parse(result));
                else
                    reject(error);
            });
        });
        return __promise;
    };

    /**
     * <summary>
     *  Given the current query expression <paramref name="qexpr" />, it returns the next filter token options. 
     * </summary>
     * <param name="cntx">Authenticated caller context object. If cannot be null.</param>
     * <param name="qexpr">The current query expression.</param>
     * <param name="tkstr">Partial user input to filter the options further. It is not used on the service side in the current version of the system.</param>
     * <returns>
     *   A list of possible filter tokens.
     * </returns>
     */

/* input parameter schema reference template
{
    "$schema": "http://localhost:11333/sets/SupplierServiceInputParams?db=Northwind&subdoc=GetNextFilterOps"
}
*/
    self.GetNextFilterOps = function (input) {
        var __promise = new Q.Promise(function (resolve, reject, notify) {
            var opts = {
                cntx: JSON.stringify(typeof input.cntx === 'undefined' || !input.cntx ? cntx : input.cntx),
                qexpr: JSON.stringify(input.qexpr),
                tkstr: input.tkstr
            };
            self._GetNextFilterOps(opts, function (error, result) {
                if (!error)
                    resolve(JSON.parse(result));
                else
                    reject(error);
            });
        });
        return __promise;
    };
};

var assemblyPath = path.join(global.NorthwindServerPath, 'NorthwindServiceAPI.NodeJS.dll');

api.prototype._GetSetInfo = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.SupplierNodeJsApi',
    methodName: 'GetSetInfo'
});

api.prototype._AddOrUpdateEntities = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.SupplierNodeJsApi',
    methodName: 'AddOrUpdateEntities'
});

api.prototype._EnqueueNewOrUpdateEntities = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.SupplierNodeJsApi',
    methodName: 'EnqueueNewOrUpdateEntities'
});

api.prototype._DeleteEntities = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.SupplierNodeJsApi',
    methodName: 'DeleteEntities'
});

api.prototype._NextPageBlock = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.SupplierNodeJsApi',
    methodName: 'NextPageBlock'
});

api.prototype._GetPageItems = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.SupplierNodeJsApi',
    methodName: 'GetPageItems'
});

api.prototype._QueryEntityCount = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.SupplierNodeJsApi',
    methodName: 'QueryEntityCount'
});

api.prototype._QueryDatabase = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.SupplierNodeJsApi',
    methodName: 'QueryDatabase'
});

api.prototype._QueryDatabaseLimited = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.SupplierNodeJsApi',
    methodName: 'QueryDatabaseLimited'
});

api.prototype._MaterializeProducts = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.SupplierNodeJsApi',
    methodName: 'MaterializeProducts'
});

api.prototype._MaterializeAllProducts = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.SupplierNodeJsApi',
    methodName: 'MaterializeAllProducts'
});

api.prototype._LoadEntityByKey = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.SupplierNodeJsApi',
    methodName: 'LoadEntityByKey'
});

api.prototype._LoadEntityGraphRecursJson = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.SupplierNodeJsApi',
    methodName: 'LoadEntityGraphRecursJson'
});

api.prototype._LoadEntityByNature = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.SupplierNodeJsApi',
    methodName: 'LoadEntityByNature'
});

api.prototype._LoadEntityHomePage = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.SupplierNodeJsApi',
    methodName: 'LoadEntityHomePage'
});

api.prototype._UpdateEntityHomePage = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.SupplierNodeJsApi',
    methodName: 'UpdateEntityHomePage'
});

api.prototype._GetNextSorterOps = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.SupplierNodeJsApi',
    methodName: 'GetNextSorterOps'
});

api.prototype._GetNextFilterOps = edge.func({
    assemblyFile: assemblyPath,
    typeName: 'CryptoGateway.RDB.Data.Northwind.SupplierNodeJsApi',
    methodName: 'GetNextFilterOps'
});

module.exports = api;
