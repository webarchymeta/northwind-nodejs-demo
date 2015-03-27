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

define(['knockout', 'config', 'queryTerms', 'model'], function (ko, config, tkfilter, model) {

    var c = function () {

        var self = this;
        var set;
        var loadingPage = false;

        self.isProcessing = ko.observable(false);

        var setWait = function (wait) {
            self.isProcessing(wait);
        }

        self.showlist = function () {
            var qexpr = set.getQueryExpr();
            if (set.IsQueryStateChanged()) {
                set.ResetPageState();
            }
            set.NextPageBlock(qexpr, null, true).done(function () {
                if (set.CurrentPage() !== null && !(typeof set.CurrentPage().Items === 'undefined')) {
                    set.CurrentPage().Items.removeAll();
                }
                if (set.PageBlocks().length > 0 && set.PageBlocks()[0].Pages().length > 0) {
                    loadpage(0);
                }
            });
        }

        self.prevPageBlock = function () {
            if (loadingPage) {
                return;
            }
            var idx = set.CurrBlockIndex();
            if (idx > 0) {
                set.CurrBlockIndex(idx - 1);
                set.PagesWindow.removeAll();
                var ipage = -1;
                for (var i = 0; i < set.PageBlocks()[idx - 1].Pages().length; i++) {
                    var p = set.PageBlocks()[idx - 1].Pages()[i];
                    set.PagesWindow.push(p);
                    if (p.IsPageSelected()) {
                        ipage = p.Index_();
                    }
                }
                loadpage(ipage == -1 ? 0 : ipage);
            }
        }

        self.nextPageBlock = function () {
            if (loadingPage) {
                return;
            }
            var idx = set.CurrBlockIndex();
            if (idx < set.PageBlocks().length - 1) {
                set.CurrBlockIndex(idx + 1);
                set.PagesWindow.removeAll();
                var ipage = -1;
                for (var i = 0; i < set.PageBlocks()[idx + 1].Pages().length; i++) {
                    var p = set.PageBlocks()[idx + 1].Pages()[i];
                    set.PagesWindow.push(p);
                    if (p.IsPageSelected()) {
                        ipage = p.Index_();
                    }
                }
                loadpage(ipage == -1 ? 0 : ipage);
            } else {
                idx = set.PageBlocks().length - 1;
                var b = set.PageBlocks()[idx];
                if (!b.IsLastBlock()) {
                    set.CurrBlockIndex(idx + 1);
                    var p = b.LastPage();
                    if (p == null) {
                        return;
                    }
                    var qexpr = set.getQueryExpr();
                    set.NextPageBlock(qexpr, p.LastItem(), true).done(function (ok, ch) {
                        if (set.PageBlocks().length > 0 && set.PageBlocks()[idx + 1].Pages().length > 0) {
                            loadpage(set.PageBlocks()[idx + 1].Pages()[0].Index_());
                        }
                    });
                }
            }
        };

        self.setCurrentPage = function(page) {
            loadpage(page.Index_());
        };

        var loadpage = function (index) {
            if (loadingPage) {
                return;
            }
            loadingPage = true;
            var p = null;
            var p0 = null;
            var blk = set.PageBlocks()[set.CurrBlockIndex()];
            for (var i = 0;i < blk.Pages().length; i++) {
                var _p = blk.Pages()[i];
                if (_p.Index_() == index) {
                   p = _p;
                } else if (_p.IsPageSelected()) {
                   p0 = _p;
                }
            }
            setWait(true)
            if (p !== null) {
                if (!p.IsDataLoaded()) {
                   p.GetPageItems(set).done(function () {
                       updateCurrPage(p, p0);
                       /*
                       for (var i = 0; i < p.Items().length; i++ ) {
                           p.Items()[i].TobeLoadMsg(serverMessage1);
                       }
                       */
                       loadingPage = false;
                       setWait(false)
                   });
                } else {
                    updateCurrPage(p, p0);
                    loadingPage = false;
                    setWait(false)
                }
            } else {
                loadingPage = false;
                setWait(false)
            }
        }

        var updateCurrPage = function (p, p0) {
            set.CurrentPage(p);
            p.IsPageSelected(true);
            if (p0 !== null) {
                p0.IsPageSelected(false);
            }
            if (set.CurrentPage().CurrentItem() !== null) {
                updateEntityDetails();
            }
        }

        self.showEntity = function (data, event) {
            currentDisplayEntity = data.data;
            currentSelectedSet = set;
            $("#displayWindow").dialog('option', 'title', 'Order View');
            $("#displayWindow").dialog("open");
            $("#displayFrame")[0].src = "EntityView";
            event.stopPropagation();
            return false;
        }

        self.selectEntity = function (data, event) {
            for (var i = 0; i < set.CurrentPage().Items().length; i++) {
                var e = set.CurrentPage().Items()[i];
                if (e.IsEntitySelected() && e !== data) {
                    e.IsEntitySelected(false);
                }
            }
            data.IsEntitySelected(true);
            set.CurrentPage().CurrentItem(data);
            updateEntityDetails();
            if (typeof parent !== 'undefined' && parent !== null) {
                parent.childSelectedEntity = data;
            }
            event.stopPropagation();
            return false;
        }


        childSelectedEntity = null;
        currentDisplayEntity = null;
        currentUpdatingEntity = null;
        currentSelectedSet = null;

        var EntityTabUpdating = false;
        var currEntityTabIndex = 0;
        var OKStr = 'OK';
        var CancelStr = 'Cancel';

        var updateEntityDetails = function () {
            $("#EntityDetails .Details .SetNav").accordion({
                collapsible: true,
                heightStyle: "auto"
            });
            $("#EntityDetails .Details .SetNav .ui-accordion-content").show();
            $("#EntityDetails .Details .SetNav button").button();
            $("#EntityDetails .Details .Tabs button").button();
            $("#EntityDetails .Details .Tabs").tabs({
                heightStyle: "auto",
                active: currEntityTabIndex,
                activate: function (event, ui) {
                    if (EntityTabUpdating) return;
                    currEntityTabIndex = ui.newTab.index();
                }
            }).css({
                'min-height': '220px',
                'overflow': 'auto'
            });;
            $(".resizeblock").on("click", function () {
                $(this).resizable({ aspectRatio: true });
            });
        }

        self.MaterializeCustomerRef = function (data, event) {
            data.MaterializeCustomerRef().done(function () {
                if (set !== null) {
                    for (var i = 0; i < set.CurrentPage().Items().length; i++) {
                        var e = set.CurrentPage().Items()[i];
                        if (e.CustomerID() == data.CustomerID() && e !== data) {
                            e.data.CustomerRef = data.CustomerRef();
                            e.CustomerRef(e.data.CustomerRef);
                            e.IsCustomerRefMaterialized(true);
                        }
                    }
                }
                $(event.currentTarget).qtip({
                    overwrite: true,
                    content: data.CustomerRef() ? data.CustomerRef().DistinctString : 'null',
                    position: {
                        my: 'left bottom',
                        at: 'top left',
                        target: $(event.currentTarget)
                    },
                    show: {
                        event: 'none',
                        ready: true,
                        solo: true
                    },
                    hide: 'unfocus'
                });
                $(event.currentTarget).qtip('toggle', true);
            });
            event.stopPropagation();
            return false;
        }

        self.display_CustomerRef = function (data, event) {
            $("#displayWindow").dialog('option', 'title', 'Order View');
            if (data.data.CustomerID !== null) {
                $("#displayWindow").dialog("open");
                if (!data.IsCustomerRefMaterialized()) {
                    data.MaterializeCustomerRef().done(function () {
                        $("#displayFrame")[0].src = '../Customer/LoadEntityView?CustomerID=' + data.CustomerID();
                    });
                } else {
                    $("#displayFrame")[0].src = '../Customer/LoadEntityView?CustomerID=' + data.CustomerID();
                }
            }
        }

        self.select_CustomerID = function (data, event) {
            var selBtns = {};
            selBtns[OKStr] = function () { 
                CustomerID_selected();
                $(this).dialog('close');
            }
            selBtns[CancelStr] = function () { 
                childSelectedEntity = null; 
                $(this).dialog('close');
            };
            $("#selectWindow").dialog('option', 'title', 'Customer View');    
            $("#selectWindow").dialog('option', 'buttons', selBtns);    
            $("#selectWindow").dialog("open");
            currentUpdatingEntity = data;
            if (data.data !== null) {
                if (data.CustomerID() !== null) {
                    $("#selectFrame")[0].src = '../Customer/SelectView?filter=' + encodeURIComponent('CustomerID !== ' + data.CustomerID());
                } else {
                    $("#selectFrame")[0].src = '../Customer/SelectView?filter=';
                }
            } else {
                $("#selectFrame")[0].src = '../Customer/SelectView?filter=';
            }
            event.stopPropagation();
            return false;
        }

        var CustomerID_selected = function () {
            if (currentUpdatingEntity !== null && childSelectedEntity !== null) {
                currentUpdatingEntity.CustomerID(childSelectedEntity.CustomerID());
            }
        }

        self.MaterializeShipperRef = function (data, event) {
            data.MaterializeShipperRef().done(function () {
                if (set !== null) {
                    for (var i = 0; i < set.CurrentPage().Items().length; i++) {
                        var e = set.CurrentPage().Items()[i];
                        if (e.ShipVia() == data.ShipVia() && e !== data) {
                            e.data.ShipperRef = data.ShipperRef();
                            e.ShipperRef(e.data.ShipperRef);
                            e.IsShipperRefMaterialized(true);
                        }
                    }
                }
                $(event.currentTarget).qtip({
                    overwrite: true,
                    content: data.ShipperRef() ? data.ShipperRef().DistinctString : 'null',
                    position: {
                        my: 'left bottom',
                        at: 'top left',
                        target: $(event.currentTarget)
                    },
                    show: {
                        event: 'none',
                        ready: true,
                        solo: true
                    },
                    hide: 'unfocus'
                });
                $(event.currentTarget).qtip('toggle', true);
            });
            event.stopPropagation();
            return false;
        }

        self.display_ShipperRef = function (data, event) {
            $("#displayWindow").dialog('option', 'title', 'Order View');
            if (data.data.ShipVia !== null) {
                $("#displayWindow").dialog("open");
                if (!data.IsShipperRefMaterialized()) {
                    data.MaterializeShipperRef().done(function () {
                        $("#displayFrame")[0].src = '../Shipper/LoadEntityView?ShipperID=' + data.ShipVia();
                    });
                } else {
                    $("#displayFrame")[0].src = '../Shipper/LoadEntityView?ShipperID=' + data.ShipVia();
                }
            }
        }

        self.select_ShipVia = function (data, event) {
            var selBtns = {};
            selBtns[OKStr] = function () { 
                ShipVia_selected();
                $(this).dialog('close');
            }
            selBtns[CancelStr] = function () { 
                childSelectedEntity = null; 
                $(this).dialog('close');
            };
            $("#selectWindow").dialog('option', 'title', 'Shipper View');    
            $("#selectWindow").dialog('option', 'buttons', selBtns);    
            $("#selectWindow").dialog("open");
            currentUpdatingEntity = data;
            if (data.data !== null) {
                if (data.ShipVia() !== null) {
                    $("#selectFrame")[0].src = '../Shipper/SelectView?filter=' + encodeURIComponent('ShipperID !== ' + data.ShipVia());
                } else {
                    $("#selectFrame")[0].src = '../Shipper/SelectView?filter=';
                }
            } else {
                $("#selectFrame")[0].src = '../Shipper/SelectView?filter=';
            }
            event.stopPropagation();
            return false;
        }

        var ShipVia_selected = function () {
            if (currentUpdatingEntity !== null && childSelectedEntity !== null) {
                currentUpdatingEntity.ShipVia(childSelectedEntity.ShipperID());
            }
        }

        self.MaterializeEmployeeRef = function (data, event) {
            data.MaterializeEmployeeRef().done(function () {
                if (set !== null) {
                    for (var i = 0; i < set.CurrentPage().Items().length; i++) {
                        var e = set.CurrentPage().Items()[i];
                        if (e.EmployeeID() == data.EmployeeID() && e !== data) {
                            e.data.EmployeeRef = data.EmployeeRef();
                            e.EmployeeRef(e.data.EmployeeRef);
                            e.IsEmployeeRefMaterialized(true);
                        }
                    }
                }
                $(event.currentTarget).qtip({
                    overwrite: true,
                    content: data.EmployeeRef() ? data.EmployeeRef().DistinctString : 'null',
                    position: {
                        my: 'left bottom',
                        at: 'top left',
                        target: $(event.currentTarget)
                    },
                    show: {
                        event: 'none',
                        ready: true,
                        solo: true
                    },
                    hide: 'unfocus'
                });
                $(event.currentTarget).qtip('toggle', true);
            });
            event.stopPropagation();
            return false;
        }

        self.display_EmployeeRef = function (data, event) {
            $("#displayWindow").dialog('option', 'title', 'Order View');
            if (data.data.EmployeeID !== null) {
                $("#displayWindow").dialog("open");
                if (!data.IsEmployeeRefMaterialized()) {
                    data.MaterializeEmployeeRef().done(function () {
                        $("#displayFrame")[0].src = '../Employee/LoadEntityView?EmployeeID=' + data.EmployeeID();
                    });
                } else {
                    $("#displayFrame")[0].src = '../Employee/LoadEntityView?EmployeeID=' + data.EmployeeID();
                }
            }
        }

        self.select_EmployeeID = function (data, event) {
            var selBtns = {};
            selBtns[OKStr] = function () { 
                EmployeeID_selected();
                $(this).dialog('close');
            }
            selBtns[CancelStr] = function () { 
                childSelectedEntity = null; 
                $(this).dialog('close');
            };
            $("#selectWindow").dialog('option', 'title', 'Employee View');    
            $("#selectWindow").dialog('option', 'buttons', selBtns);    
            $("#selectWindow").dialog("open");
            currentUpdatingEntity = data;
            if (data.data !== null) {
                if (data.EmployeeID() !== null) {
                    $("#selectFrame")[0].src = '../Employee/SelectView?filter=' + encodeURIComponent('EmployeeID !== ' + data.EmployeeID());
                } else {
                    $("#selectFrame")[0].src = '../Employee/SelectView?filter=';
                }
            } else {
                $("#selectFrame")[0].src = '../Employee/SelectView?filter=';
            }
            event.stopPropagation();
            return false;
        }

        var EmployeeID_selected = function () {
            if (currentUpdatingEntity !== null && childSelectedEntity !== null) {
                currentUpdatingEntity.EmployeeID(childSelectedEntity.EmployeeID());
            }
        }

        self.display_Order_Details = function (data, event) {
            if (!data.IsOrder_DetailsMaterialized()) {
                data.MaterializeOrder_Details().done(function () {
                    display_subset('Order_Detail', data.Order_Details());
                });
            } else {
                display_subset('Order_Detail', data.Order_Details());
            }
        }

        self.display_subset = function (setname, subset) {
            var url = dbBaseUrl + setname + '/MainFilteredView?filter=' + encodeURIComponent(subset.SetFilter);
            $("#displayWindow").dialog('option', 'title', setname + ' (' + subset.SetFilter + ')');
            $("#displayWindow").dialog("open");
            $("#displayFrame")[0].src = url;
        }

        currentNewEntity = null;

        self.addNewEntity = function () {
            var Btns = {};
            Btns[OKStr] = function () {
                if (currentNewEntity !== null && currentNewEntity.IsEntityComplete()) {
                    self.submitNewEntity(currentNewEntity);
                    $(this).dialog('close');
                } else {
                    if (typeof config.alert === 'function') {
                        config.alert(newEntityIncompleteMsg);
                    } else {
                        alert(newEntityIncompleteMsg);
                    }
                }
            }
            Btns[CancelStr] = function () { 
            //..
                $(this).dialog('close');
            };
            $("#displayWindow").dialog('option', 'title', createNewEntityFmt);
            $("#displayWindow").dialog('option', 'buttons', Btns);
            $("#displayWindow").dialog("open");
            $("#displayFrame")[0].src = 'NewEntity';
        };

        var handleOpResults = function (msgs) {
            var msg = '';
            for (var i = 0; i < msgs.length; i++) {
                msg += msgs[i] + '\r\n';
            }
            if (typeof config.alert === 'function') {
                config.alert(msg);
            } else {
                alert(msg);
            }
        };

        self.submitNewEntity = function (e) {
            if (e == null) {
                return;
            }
            var changed = [];
            changed.push(e.GetNewData());
            _setWait(true);
            set.AddOrUpdateEntities(changed).done(function (oprs) {
                if (oprs !== null && oprs.OpMsgs !== null && oprs.OpMsgs.length > 0) {
                    handleOpResults(oprs.OpMsgs);
                } else if (oprs.ChangedEntities.length == 1) {
                    e = new Order(clientContext, oprs.ChangedEntities[0].UpdatedItem);
                    if (oprs.ConflictEntities !== null && oprs.ConflictEntities.length == 1) {
                        e.ConflictWithItem = new Order(clientContext, oprs.ConflictEntities[0].ConflictItem);
                    }
                    e.IsNewAddition(true);
                    if (set.CurrentPage().Items) {
                        set.CurrentPage().Items.push(e);
                    }
                    var cnt = set.EntityCount() + 1;
                    set.EntityCount(cnt);
                    $(".entityDetails").button({
                        text: false,
                        icons: { primary: "ui-icon-zoomin" }
                    });
                    $(".entityDelete").button({
                        text: false,
                        icons: { primary: "ui-icon-close" }
                    });
                }
                _setWait(false);
            }).fail(function (jqxhr, textStatus, error) {
                _setWait(false);
            });
        }

        self.deleteEntity = function (data, event) {
            var deleted = [];
            deleted.push(data.data);
            _setWait(true);
            set.DeleteEntities(deleted).done(function (oprs) {
                if (oprs !== null && oprs.OpMsgs !== null && oprs.OpMsgs.length > 0) {
                    handleOpResults(oprs.OpMsgs);
                } else {
                    set.CurrentPage().Items.remove(data);
                    var cnt = set.EntityCount() - 1;
                    set.EntityCount(cnt);
                }
                _setWait(false);
            }).fail(function (jqxhr, textStatus, error) {
                _setWait(false);
            });
            event.stopPropagation();
            return false;
        }

        self.submitChanges = function () {
            var changed = [];
            var changedVM = [];
            var idx = 0;
            for (var i = 0; i < set.PageBlocks().length; i++) {
                var pb = set.PageBlocks()[i];
                for (var j = 0; j < pb.Pages().length; j++) {
                    var p = pb.Pages()[j];
                    if (!p.IsDataLoaded()) {
                        continue;
                    }
                    for (var k = 0; k < p.Items().length; k++) {
                        var e = p.Items()[k];
                        if (e.IsEntityModified()) {
                            var d = e.GetUpdatedData();
                            d.UpdateIndex = idx;
                            e.UpdateIndex = idx;
                            changed.push(d);
                            changedVM.push(e);
                            idx++;
                        }
                    }
                }
            }
            _setWait(true);
            set.AddOrUpdateEntities(changed).done(function (oprs) {
                if (oprs !== null && oprs.OpMsgs !== null && oprs.OpMsgs.length > 0) {
                    handleOpResults(oprs.OpMsgs);
                }
                for (var i = 0; i < changedVM.length; i++) {
                    for (var j = 0; j < oprs.ChangedEntities.length; j++) {
                        if (changedVM[i].UpdateIndex == oprs.ChangedEntities[j].UpdatedItem.UpdateIndex) {
                            changedVM[i].UpdateData(oprs.ChangedEntities[j].UpdatedItem);
                            break;
                        }
                    }
                    if (oprs.ConflictEntities !== null) {
                        for (var j = 0; j < oprs.ConflictEntities.length; j++) {
                            if (changedVM[i].UpdateIndex == oprs.ConflictEntities[j].UpdatedItem.UpdateIndex) {
                                changedVM[i].ConflictWithItem = new Order(clientContext,  oprs.ConflictEntities[j].UpdatedItem);
                                break;
                            }
                        }
                    }
                    changedVM[i].UpdateIndex = -1;
                }
                _setWait(false);
            }).fail(function (jqxhr, textStatus, error) {
                _setWait(false);
            });
        }

        self.resetChanges = function () {
            for (var i = 0; i < set.PageBlocks().length; i++) {
                var pb = set.PageBlocks()[i];
                for (var j = 0; j < pb.Pages().length; j++) {
                    var p = pb.Pages()[j];
                    if (!p.IsDataLoaded()) {
                        continue;
                    }
                    for (var k = 0; k < p.Items().length; k++) {
                        var e = p.Items()[k];
                        if (e.IsEntityModified()) {
                            e.ResetData();
                        }
                    }
                }
            }
        }

        self.initialize = function (filter) {
            pageMgr.loadedModelTable['service-clients/scripts/Northwind/models/sets/Order'] = model;
            set = new model.entitySet();
            return set.GetSetInfo(tkfilter, filter);
        };
    }
    return c;
})