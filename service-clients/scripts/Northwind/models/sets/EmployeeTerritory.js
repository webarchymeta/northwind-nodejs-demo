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

define(['knockout', 'config', 'queryModels' ], function (ko, config, q) {

    var EmployeeTerritoryView = function (data) {
        var self = this;
        self.IsViewModel = true;
        self.data = data;
        self.DistinctString = data !== null ? data.DistinctString : "";
        self.LookupQuery = data !== null ? "?EmployeeID=" + self.data.EmployeeID + "&TerritoryID=" + self.data.TerritoryID : "";

        self.CreateSet = function () {
            return new EmployeeTerritorySet();
        };

        self.EmployeeID = data.EmployeeID;
        self.TerritoryID = data.TerritoryID;
        self.IsEntityIdentical = function (data) {
            if (typeof data == 'undefined' || data == null || typeof data.IsViewModel == 'undefined' || self.IsViewModel !== data.IsViewModel ) {
                return false;
            }
            return self.EmployeeID == data.EmployeeID && self.TerritoryID == data.TerritoryID;
        };

        if (data.EmployeeRef == null) {
            self.EmployeeRef = ko.observable(null);
            self.IsEmployeeRefMaterialized = ko.observable(false);
        } else {
            self.IsEmployeeRefMaterialized = ko.observable(false);
            pageMgr.loadModelModule('service-clients/scripts/Northwind/models/sets/Employee', function (m) {
                self.EmployeeRef = ko.observable(new m.entityView(data.EmployeeRef));
                self.IsEmployeeRefMaterialized(true);
            });
        }
        self.EmployeeRefSummary = ko.pureComputed(function () {
            if (self.IsEmployeeRefMaterialized() && data !== null) {
                return self.EmployeeRef.DistinctString;
            } else {
                return "";
            }
        });

        self.MaterializeEmployeeRef = function () {
            if (self.IsEmployeeRefMaterialized()) {
                return $.Deferred().resolve();
            }
            return $.ajax({
                url: config.baseUrl + "/services/Northwind/EmployeeTerritorySet/MaterializeEmployeeRef",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ entity: self.shallowDataCopy() })
            }).pipe(
                function (dref) {
                    if (dref !== null) {
                        self.data.EmployeeRef = dref;
                        pageMgr.loadModelModule('service-clients/scripts/Northwind/models/sets/Employee', function (m) {
                            self.EmployeeRef(new m.entityView(dref));
                            self.IsEmployeeRefMaterialized(true);
                        });
                    }
                    return $.Deferred().resolve();
                },
                function (jqxhr, textStatus, error) {
                    return $.Deferred().reject(jqxhr, textStatus, error);
                }
            );
        };

        if (data.TerritoryRef == null) {
            self.TerritoryRef = ko.observable(null);
            self.IsTerritoryRefMaterialized = ko.observable(false);
        } else {
            self.IsTerritoryRefMaterialized = ko.observable(false);
            pageMgr.loadModelModule('service-clients/scripts/Northwind/models/sets/Territory', function (m) {
                self.TerritoryRef = ko.observable(new m.entityView(data.TerritoryRef));
                self.IsTerritoryRefMaterialized(true);
            });
        }
        self.TerritoryRefSummary = ko.pureComputed(function () {
            if (self.IsTerritoryRefMaterialized() && data !== null) {
                return self.TerritoryRef.DistinctString;
            } else {
                return "";
            }
        });

        self.MaterializeTerritoryRef = function () {
            if (self.IsTerritoryRefMaterialized()) {
                return $.Deferred().resolve();
            }
            return $.ajax({
                url: config.baseUrl + "/services/Northwind/EmployeeTerritorySet/MaterializeTerritoryRef",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ entity: self.shallowDataCopy() })
            }).pipe(
                function (dref) {
                    if (dref !== null) {
                        self.data.TerritoryRef = dref;
                        pageMgr.loadModelModule('service-clients/scripts/Northwind/models/sets/Territory', function (m) {
                            self.TerritoryRef(new m.entityView(dref));
                            self.IsTerritoryRefMaterialized(true);
                        });
                    }
                    return $.Deferred().resolve();
                },
                function (jqxhr, textStatus, error) {
                    return $.Deferred().reject(jqxhr, textStatus, error);
                }
            );
        };

        self.shallowDataCopy = function() {
            return {
                EmployeeID: self.data.EmployeeID,
                TerritoryID: self.data.TerritoryID
            };
        };

        self.IsEntitySelected = ko.observable(false);
    };

    var EmployeeTerritory = function (data) {
        var self = this;
        self.IsViewModel = false;
        self.TobeLoadMsg = ko.observable('to be loaded ...');
        self.Initializing = true;
        self.data = data;
        self.IsPersisted = ko.observable(data !== null);
        self.IsNewAddition = ko.observable(false);
        self.UpdateIndex = -1;
        self.DistinctString = ko.observable(data !== null ? data.DistinctString : "");
        self.LookupQuery = data !== null ? "entityedit?EmployeeID=" + self.data.EmployeeID + "&TerritoryID=" + self.data.TerritoryID : "";

        self.CreateSet = function () {
            return new EmployeeTerritorySet();
        };

        self.EmployeeID = data.EmployeeID;
        self.TerritoryID = data.TerritoryID;
        self.IsEntityChanged = ko.observable(false);

        self.IfEntityChanged = ko.pureComputed(function () {
            return ;
        });

        self.IsEntityModified = function () {
            return ;
        }

        self.IsEntityComplete = function () {
            return true;
        };

        self.IsEntityIdentical = function (data) {
            if (typeof data == 'undefined' || data == null || typeof data.IsViewModel == 'undefined' || self.IsViewModel !== data.IsViewModel ) {
                return false;
            }
            return self.EmployeeID() == data.EmployeeID() && self.TerritoryID() == data.TerritoryID();
        };

        self.GetUpdatedData = function () {
            if (self.data == null) {
                return self.GetNewData();
            }
            var d = self.NewDataCopy();
            return null;
        };

        self.GetNewData = function () {
            var d = {
                "EmployeeID": self.EmployeeID,
                "TerritoryID": self.TerritoryID,
                "IsEntityChanged": true,
                "IsPersisted": false
            };
            return d;
        };

        self.NewDataCopy = function () {
            var d = {
                "EmployeeID": self.data.EmployeeID,
                "TerritoryID": self.data.TerritoryID,
                "IsEntityChanged": self.data.IsEntityChanged,
                "IsPersisted": self.data.IsPersisted
            };
            return d;
        };

        self.UpdateData = function (dsrc) {
            if (self.data == null ) {
                return;
            }
        };

        self.ResetData = function () {
            if (self.data == null ) {
                return;
            }
        };

        self.shallowDataCopy = function() {
            return {
                EmployeeID: self.data.EmployeeID,
                TerritoryID: self.data.TerritoryID
            };
        }

        if (data == null) {
            self.IsEmployeeRefMaterialized = ko.observable(true);
            self.EmployeeRef = ko.observable(null);
        } else if (data.EmployeeRef == null) {
            self.IsEmployeeRefMaterialized = ko.observable(false);
            self.EmployeeRef = ko.observable(null);
        } else {
            self.IsEmployeeRefMaterialized = ko.observable(false);
            pageMgr.loadModelModule('service-clients/scripts/Northwind/models/sets/Employee', function (m) {
                self.EmployeeRef = ko.observable(new m.entity(data.EmployeeRef));
                self.IsEmployeeRefMaterialized(true);
            });
        }

        self.EmployeeRefSummary = ko.pureComputed(function () {
            if (self.IsEmployeeRefMaterialized() && data !== null) {
                return self.EmployeeRef().DistinctString;
            } else {
                return self.TobeLoadMsg();
            }
        });

        self.MaterializeEmployeeRef = function () {
            if (self.IsEmployeeRefMaterialized()) {
                return $.Deferred().resolve();
            }
            return $.ajax({
                url: config.baseUrl + "/services/Northwind/EmployeeTerritorySet/MaterializeEmployeeRef",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ entity: self.shallowDataCopy() })
            }).pipe(
                function (dref) {
                    if (dref !== null) {
                        self.data.EmployeeRef = dref;
                        pageMgr.loadModelModule('service-clients/scripts/Northwind/models/sets/Employee', function (m) {
                            self.EmployeeRef(new m.entityEdit(m));
                            self.IsEmployeeRefMaterialized(true);
                        });
                    }
                    return $.Deferred().resolve();
                },
                function (jqxhr, textStatus, error) {
                    return $.Deferred().reject(jqxhr, textStatus, error);
                }
            );
        };

        if (data == null) {
            self.IsTerritoryRefMaterialized = ko.observable(true);
            self.TerritoryRef = ko.observable(null);
        } else if (data.TerritoryRef == null) {
            self.IsTerritoryRefMaterialized = ko.observable(false);
            self.TerritoryRef = ko.observable(null);
        } else {
            self.IsTerritoryRefMaterialized = ko.observable(false);
            pageMgr.loadModelModule('service-clients/scripts/Northwind/models/sets/Territory', function (m) {
                self.TerritoryRef = ko.observable(new m.entity(data.TerritoryRef));
                self.IsTerritoryRefMaterialized(true);
            });
        }

        self.TerritoryRefSummary = ko.pureComputed(function () {
            if (self.IsTerritoryRefMaterialized() && data !== null) {
                return self.TerritoryRef().DistinctString;
            } else {
                return self.TobeLoadMsg();
            }
        });

        self.MaterializeTerritoryRef = function () {
            if (self.IsTerritoryRefMaterialized()) {
                return $.Deferred().resolve();
            }
            return $.ajax({
                url: config.baseUrl + "/services/Northwind/EmployeeTerritorySet/MaterializeTerritoryRef",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ entity: self.shallowDataCopy() })
            }).pipe(
                function (dref) {
                    if (dref !== null) {
                        self.data.TerritoryRef = dref;
                        pageMgr.loadModelModule('service-clients/scripts/Northwind/models/sets/Territory', function (m) {
                            self.TerritoryRef(new m.entityEdit(m));
                            self.IsTerritoryRefMaterialized(true);
                        });
                    }
                    return $.Deferred().resolve();
                },
                function (jqxhr, textStatus, error) {
                    return $.Deferred().reject(jqxhr, textStatus, error);
                }
            );
        };

        self.IsEntitySelected = ko.observable(false);
        self.Initializing = false;
    };

    var EmployeeTerritoryPage = function (s, edit) {
        var self = this;
        var editPage = edit;
        self.set = s;
        self.Index_ = ko.observable();
        self.PageNumber = ko.pureComputed(function () {
            return self.Index_() + 1;
        });
        self.FirstItem = ko.observable({});
        self.LastItem = ko.observable({});
        self.CurrentItem = ko.observable(null);
        self.IsLastPage = ko.observable(false);
        self.IsDataLoaded = ko.observable(false);
        self.IsPageSelected = ko.observable(false);
        self.Items =  ko.observableArray([]);
        self.GetPageItems = function (s, pageLoader) {
            if (self.IsDataLoaded()) 
                return $.Deferred().resolve();
            var qexpr = s.getQueryExpr();
            var lastItem = null;
            var ipage = self.Index_();
            if (self.Index_() > 0) {
                var blk = s.PageBlocks()[s.CurrBlockIndex()];
                if (blk.Pages()[0].Index_() !== ipage) {
                    for (var i = 0; i < blk.Pages().length; i++) {
                        if (blk.Pages()[i].Index_() == ipage - 1) {
                            lastItem = blk.Pages()[i].LastItem();
                            break;
                        }
                    }
                } else {
                    var prvb = s.PageBlocks()[s.CurrBlockIndex() - 1];
                    lastItem = prvb.Pages()[prvb.Pages().length - 1].LastItem();
                }
            }
            self.Items.removeAll();
            if (typeof pageLoader !== 'function') {
                return $.ajax({
                    url: config.baseUrl + "/services/Northwind/EmployeeTerritorySet/GetPageItems",
                    type: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({ set: s.set, qexpr: qexpr, prevlast: lastItem })
                }).pipe(
                    function (items) {
                        for (var i = 0; i < items.length; i++) {
                            if (editPage)
                                self.Items.push(new EmployeeTerritory(items[i]));
                            else
                                self.Items.push(new EmployeeTerritoryView(items[i]));
                        }
                        self.IsDataLoaded(true);
                        return $.Deferred().resolve();
                    },
                    function (jqxhr, textStatus, error) {
                        return $.Deferred().reject(jqxhr, textStatus, error);
                    }
                );
            } else {
                return pageLoader(self, { set: s.set, qexpr: qexpr, prevlast: lastItem });
            }
        };
    };

    var EmployeeTerritoryPageBlock = function (s, idx0, data, edit) {
        var self = this;
        var set = s;
        self.BlockIndex = ko.observable(0);
        self.BlockNumber = ko.pureComputed(function () { return self.BlockIndex() + 1; });
        self.IsBlockSelected = ko.pureComputed(function() {
            return set.CurrBlockIndex() == self.BlockIndex();
        });
        self.IsLastBlock = ko.observable(data.IsLastBlock);
        self.BlockCount = data.BlockCount;
        self.Pages = ko.observableArray([]);
        if (data.Pages) {
            for (var i = 0; i < data.Pages.length; i++ ) {
                var pdata = data.Pages[i];
                var page = new EmployeeTerritoryPage(s, edit);
                page.Index_(idx0 + pdata.Index_);
                page.FirstItem(pdata.FirstItem);
                page.LastItem(pdata.LastItem);
                page.IsLastPage(pdata.IsLastPage);
                self.Pages.push(page);
            }
        }
        self.LastPage = function () {
            return self.Pages().length == 0 ? null : self.Pages()[self.Pages().length - 1];
        };
    }

    var EmployeeTerritorySettings = function (settings) {
        var self = this;
        self.data = settings || {};
        self.data.show_EmployeeID = self.data.show_EmployeeID || true;
        self.show_EmployeeID = ko.observable(self.data.show_EmployeeID);
        self.show_EmployeeID.subscribe(function (v) {
            self.data.show_EmployeeID = v;
        });
        self.data.collapse_EmployeeID = self.data.collapse_EmployeeID || false;
        self.collapse_EmployeeID = ko.observable(self.data.collapse_EmployeeID);
        self.collapse_EmployeeID.subscribe(function (v) {
            self.data.collapse_EmployeeID = v;
        });
        self.data.width_EmployeeID = self.data.width_EmployeeID || 'auto';
        self.width_EmployeeID = ko.observable(self.data.width_EmployeeID);
        self.width_EmployeeID.subscribe(function (v) {
            self.data.width_EmployeeID = v;
        });
        self.data.show_TerritoryID = self.data.show_TerritoryID || true;
        self.show_TerritoryID = ko.observable(self.data.show_TerritoryID);
        self.show_TerritoryID.subscribe(function (v) {
            self.data.show_TerritoryID = v;
        });
        self.data.collapse_TerritoryID = self.data.collapse_TerritoryID || false;
        self.collapse_TerritoryID = ko.observable(self.data.collapse_TerritoryID);
        self.collapse_TerritoryID.subscribe(function (v) {
            self.data.collapse_TerritoryID = v;
        });
        self.data.width_TerritoryID = self.data.width_TerritoryID || 'auto';
        self.width_TerritoryID = ko.observable(self.data.width_TerritoryID);
        self.width_TerritoryID.subscribe(function (v) {
            self.data.width_TerritoryID = v;
        });
    };

    var EmployeeTerritorySet = function () {
        var self = this;
        self.set = {};

        var jsonstr = localStorage.getItem('Northwind');
        if (typeof jsonstr == 'undefined' || jsonstr == null) {
            self.settings = new EmployeeTerritorySettings();
            var settings = { };
            settings.UIView = { };
            settings.UIView.EmployeeTerritorySet = self.settings.data;
            localStorage.setItem('Northwind', JSON.stringify(settings));
        } else {
            var settings = JSON.parse(jsonstr);
            self.settings = new EmployeeTerritorySettings(settings.UIView.EmployeeTerritorySet);
        }

        self.PageSize_ = ko.observable(config.defaultPageSize);
        self.PageWindowSize = ko.observable(config.defaultPageBlockSize);
        self.PageBlockSize = ko.observable(config.defaultPageBlockSize);
        self.SetKindName = "Table";
        self.EntityName = "EmployeeTerritory";
        self.TotalEntities = ko.observable(0);
        self.EntityCount = ko.observable(0);
        self.PageCount = ko.observable(0);
        self.PagesWindow = ko.observableArray([]);
        self.CurrentPage = ko.observable({});
        self.IsQueryStateChanged = ko.observable(false);
        self.BaseUrl = "";
        self.CurrentSorters = ko.observable(null);
        self.CurrentFilters = ko.observable(null);
        self.SortersStack = [];
        self.FiltersStack = [];
        self.SorterPath = ko.observableArray();
        self.FilterPath = ko.observableArray();
        self.PageBlocks = ko.observableArray([]);
        self.CurrBlockIndex = ko.observable(0);
        self.CurrentBlock = ko.pureComputed(function () {
            if (self.CurrBlockIndex() < 0 || self.CurrBlockIndex() >= self.PageBlocks().length - 1)
                return null;
            else
                return self.PageBlocks()[self.CurrBlockIndex()];
        });
        self.PrevBlock = ko.pureComputed(function () {
            var idx = self.CurrBlockIndex();
            if (idx > 0) {
                return self.PageBlocks()[idx - 1];
            } else {
                return null;
            }
        });
        self.NextLoadedBlock = ko.pureComputed(function () {
            var idx = self.CurrBlockIndex();
            if (idx >= 0 && idx < self.PageBlocks().length - 1) {
                return self.PageBlocks()[idx + 1];
            } else {
                return null;
            }
        });
        self.MoreNextBlock = ko.pureComputed(function () {
            var idx = self.CurrBlockIndex();
            if (idx >= 0 && idx < self.PageBlocks().length - 1) {
                return true;
            } else {
                return self.PageBlocks().length > 0 && !self.PageBlocks()[self.PageBlocks().length - 1].IsLastBlock();
            }
        });
        self.LastPageBlock = ko.pureComputed(function () {
            return self.PageBlocks().length == 0 ? null : self.PageBlocks()[self.PageBlocks().length - 1];
        });

        self.ResetPageState = function () {
            self.CurrBlockIndex(0);
            self.PageBlocks.removeAll();
            self.IsQueryStateChanged(false)
        };

        self.IsFilteredView = ko.observable(false);

        self.HasFilteredView = ko.pureComputed(function () {
            return self.CurrentFilters() !== null && self.FilterClosed();
        });

        self.FilteredViewUrl = ko.pureComputed(function () {
            if (self.CurrentFilters() == null || !self.FilterClosed()) {
                return null;
            }
            var s0 = '';
            var bsf = self.set !== null && typeof self.set.SetFilter !== 'undefined' && self.set.SetFilter !== null && self.set.SetFilter !== '';
            if (bsf)
                s0 = '( ' + self.set.SetFilter + ' )';
            var s = '';
            for (var i = 0; i < self.FilterPath().length; i++ ) {
                s += (s == '' ? '' : ' ') + self.FilterPath()[i].TkName;
            }
            if (s == '') {
                return null;
            } else {
                if (s0 == '') {
                    return 'EmployeeTerritorySet?filter=' + encodeURIComponent(s);
                } else {
                    return 'EmployeeTerritorySet?filter=' + encodeURIComponent(s0 + ' && ( ' + s + ' )');
                }
            }
        });

        self.FilteredEditUrl = ko.pureComputed(function () {
            if (self.CurrentFilters() == null || !self.FilterClosed()) {
                return null;
            }
            var s0 = '';
            var bsf = self.set !== null && typeof self.set.SetFilter !== 'undefined' && self.set.SetFilter !== null && self.set.SetFilter !== '';
            if (bsf)
                s0 = '( ' + self.set.SetFilter + ' )';
            var s = '';
            for (var i = 0; i < self.FilterPath().length; i++ ) {
                s += (s == '' ? '' : ' ') + self.FilterPath()[i].TkName;
            }
            if (s == '') {
                return null;
            } else {
                if (s0 == '') {
                    return 'EmployeeTerritorySet?filter=' + encodeURIComponent(s);
                } else {
                    return 'EmployeeTerritorySet?filter=' + encodeURIComponent(s0 + ' && ( ' + s + ' )');
                }
            }
        });

        self.FilterClosed = ko.observable(false);

        self.preSetQExpr = undefined;

        self.RefreshSetState = function(qc) {
            self.IsQueryStateChanged(true);
            self.ResetPageState();
            self.PagesWindow.removeAll();
            if (typeof self.CurrentPage().Items !== 'undefined')
                self.CurrentPage().Items.removeAll();
        };

        self.GetSetInfo = function (tkfilter, _filter) {
            self.BaseUrl = config.baseUrl;
            return $.ajax({
                url: config.baseUrl + "/services/Northwind/EmployeeTerritorySet/GetSetInfo",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ filter: _filter == null ? null : decodeURIComponent(_filter) })
            }).pipe(
                function (content) {
                    self.set = content;
                    self.IsFilteredView(typeof _filter !== 'undefined' && _filter !== null && _filter !== '');
                    self.TotalEntities(self.set.EntityCount);
                    self.CurrentSorters(new q.TokenOptions());
                    for (var i = 0; i < self.set.Sorters.length; i++) {
                        var tk = new q.QToken();
                        tk.CopyToken(self.set.Sorters[i]);
                        if (tkfilter(tk, false)) {
                            self.CurrentSorters().Options.push(tk);
                        }
                    }
                    self.CurrentSorters().CanBeClosed = true;
                    self.CurrentSorters().isLocal = false;
                    return $.Deferred().resolve(self);
                },
                function (jqxhr, textStatus, error) {
                    return $.Deferred().reject(jqxhr, textStatus, error);
                }
            );
        };

        self.getQueryExpr = function () {
            if (self.preSetQExpr)
                return self.preSetQExpr;
            var sorters = [];
            var filters = [];
            for (var i = 0; i < self.SorterPath().length; i++)
                sorters.push(self.SorterPath()[i]);
            for (var i = 0; i < self.FilterPath().length; i++)
                filters.push(self.FilterPath()[i]);
            return new q.QueryExpression(sorters, filters);
        };

        self.GetNextSorterOps = function (tkfilter) {
            var qtokens = [];
            for (var i = 0; i < self.SorterPath().length; i++)
                qtokens.push(self.SorterPath()[i]);
            return $.ajax({
                url: config.baseUrl + "/services/Northwind/EmployeeTerritorySet/GetNextSorterOps",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ sorters: qtokens  })
            }).pipe(
                function (content) {
                    self.SortersStack.push(self.CurrentSorters());
                    self.CurrentSorters(new q.TokenOptions());
                    self.CurrentSorters().Hint = content.Hint;
                    self.CurrentSorters().CurrentExpr(content.CurrentExpr);
                    self.CurrentSorters().QuoteVal = content.QuoteVal;
                    self.CurrentSorters().CanBeClosed = content.CanBeClosed;
                    self.CurrentSorters().IsLocal = false;
                    for (var i = 0; i < content.Options.length; i++) {
                        var tk = new q.QToken();
                        tk.CopyToken(content.Options[i]);
                        if (tkfilter(tk, false)) {
                            self.CurrentSorters().Options.push(tk);
                        }
                    }
                    return $.Deferred().resolve();
                },
                function (jqxhr, textStatus, error) {
                    return $.Deferred().reject(jqxhr, textStatus, error);
                }
            );
        };

        self.GetNextFilterOps = function (tkfilter) {
            var sorters = [];
            var filters = [];
            for (var i = 0; i < self.SorterPath().length; i++)
                sorters.push(self.SorterPath()[i]);
            for (var i = 0; i < self.FilterPath().length; i++)
                filters.push(self.FilterPath()[i]);
            var qexpr = new q.QueryExpression(sorters, filters);
            return $.ajax({
                url: config.baseUrl + "/services/Northwind/EmployeeTerritorySet/GetNextFilterOps",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ qexpr: qexpr, tkstr: ""  })
            }).pipe(
                function (content) {
                    if (self.CurrentFilters() !== null)
                        self.FiltersStack.push(self.CurrentFilters());
                    self.FilterClosed(content.CanBeClosed);
                    self.CurrentFilters(new q.TokenOptions());
                    self.CurrentFilters().Hint = content.Hint;
                        self.CurrentFilters().CurrentExpr(content.CurrentExpr);
                    self.CurrentFilters().QuoteVal = content.QuoteVal;
                    self.CurrentFilters().CanBeClosed = content.CanBeClosed;
                    self.CurrentFilters().IsLocal = false;
                    for (var i = 0; i < content.Options.length; i++) {
                        var tk = new q.QToken();
                        tk.CopyToken(content.Options[i]);
                        if (tkfilter(tk, true)) {
                            self.CurrentFilters().Options.push(tk);
                        }
                    }
                    return $.Deferred().resolve();
                },
                function (jqxhr, textStatus, error) {
                    return $.Deferred().reject(jqxhr, textStatus, error);
                }
            );
        };

        self.NextPageBlock = function (qexpr, last, edit) {
            if (self.IsQueryStateChanged())
                self.ResetPageState();
            if (self.CurrBlockIndex() < self.PageBlocks().length) {
                return $.Deferred().resolve();
            }
            self.set.PageBlockSize = self.PageBlockSize();
            self.set.PageSize_ = self.PageSize_();
            return $.ajax({
                url: config.baseUrl + "/services/Northwind/EmployeeTerritorySet/NextPageBlock",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ set: self.set, qexpr: qexpr, prevlast: last  })
            }).pipe(
                function (data) {
                    if (last == null) 
                        self.EntityCount(data.TotalEntities);
                    self.PageCount(data.TotalPages);
                    if (data.Pages.length == 0) {
                        var lpb = self.LastPageBlock();
                        if (lpb !== null) {
                            lpb.IsLastBlock(true);
                            var lp = lpb.LastPage();
                            if (lp !== null) {
                                lp.IsLastPage(true);
                                self.CurrBlockIndex(self.CurrBlockIndex() - 1);
                            }
                        } else {
                            self.PagesWindow.removeAll();
                        }
                    }
                    else {
                        var idx0 = 0;
                        for (var i = 0; i < self.CurrBlockIndex(); i++ ) {
                            idx0 += self.PageBlocks()[i].BlockCount;
                        }
                        var pb = new EmployeeTerritoryPageBlock(self, idx0, data, edit);
                        pb.BlockIndex(self.PageBlocks().length);
                        self.PageBlocks.push(pb);
                        self.PagesWindow.removeAll();
                        for (var i = 0; i < pb.Pages().length; i++) {
                            self.PagesWindow.push(pb.Pages()[i]);
                        }
                    }
                    self.IsQueryStateChanged(false);
                    return $.Deferred().resolve();
                },
                function (jqxhr, textStatus, error) {
                    return $.Deferred().reject(jqxhr, textStatus, error);
                }
            );
        };

        self.AddOrUpdateEntities = function (changed) {
            if (changed == null || changed.length == 0) {
                return $.Deferred().resolve(null);
            }
            return $.ajax({
                url: config.baseUrl + "/services/Northwind/EmployeeTerritorySet/AddOrUpdateEntities",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ set: self.set, entities: changed })
            }).pipe(
                function (data) {
                    //...
                    return $.Deferred().resolve(data);
                },
                function (jqxhr, textStatus, error) {
                    return $.Deferred().reject(jqxhr, textStatus, error);
                }
            );
        };

        self.DeleteEntities = function (deleted) {
            if (deleted == null || deleted.length == 0) {
                return $.Deferred().resolve(null);
            }
            return $.ajax({
                url: config.baseUrl + "/services/Northwind/EmployeeTerritorySet/DeleteEntities",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ set: self.set, entities: deleted })
            }).pipe(
                function (data) {
                    //..
                    return $.Deferred().resolve(data);
                },
                function (jqxhr, textStatus, error) {
                    return $.Deferred().reject(jqxhr, textStatus, error);
                }
            );
        };

        self.LoadEntityByKey = function(EmployeeID, TerritoryID, isView) {
            return $.ajax({
                url: config.baseUrl + "/services/Northwind/EmployeeTerritorySet/LoadEntityByKey",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ EmployeeID: EmployeeID, TerritoryID: TerritoryID })
            }).pipe(
                function (data) {
                    if (isView)
                        return $.Deferred().resolve(new EmployeeTerritoryView(data));
                    else
                        return $.Deferred().resolve(new EmployeeTerritory(data));
                },
                function (jqxhr, textStatus, error) {
                    return $.Deferred().reject(jqxhr, textStatus, error);
                }
            );
        };

    }

    return {
        entityView: EmployeeTerritoryView,
        entityEdit: EmployeeTerritory,
        entityPage: EmployeeTerritoryPage,
        entityPageBlock: EmployeeTerritoryPageBlock,
        settings: EmployeeTerritorySettings,
        entitySet: EmployeeTerritorySet
    }
})