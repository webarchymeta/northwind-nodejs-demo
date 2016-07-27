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

    var c = function (set, pageLoader) {

        var self = this;
        var loadingPage = false;
        var pageItemsLoader = pageLoader;

        self.set = set;
        self.isProcessing = ko.observable(false);
        

        var setWait = function (wait) {
            self.isProcessing(wait);
        };

        self.showlist = function (_qexpr) {
            set.preSetQExpr = _qexpr;
            var qexpr = set.getQueryExpr();
            if (set.IsQueryStateChanged()) {
                set.ResetPageState();
            }
            return set.NextPageBlock(qexpr, null, true).done(function () {
                if (set.CurrentPage() !== null && !(typeof set.CurrentPage().Items === 'undefined')) {
                    set.CurrentPage().Items.removeAll();
                }
                if (set.PageBlocks().length > 0 && set.PageBlocks()[0].Pages().length > 0) {
                    loadpage(0);
                }
            });
        };

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
        };

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
        };

        var updateCurrPage = function (p, p0) {
            set.CurrentPage(p);
            p.IsPageSelected(true);
            if (p0 !== null) {
                p0.IsPageSelected(false);
            }
            if (set.CurrentPage().CurrentItem() !== null) {
                updateEntityDetails();
            }
        };

        self.showEntity = function (data, event) {
            currentDisplayEntity = data.data;
            currentSelectedSet = set;
            $("#displayWindow").dialog('option', 'title', 'Product View');
            $("#displayWindow").dialog("open");
            $("#displayFrame")[0].src = "EntityView";
            event.stopPropagation();
            return false;
        };

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
        };


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
        };

        self.MaterializeCategoryRef = function (data, event) {
            data.MaterializeCategoryRef().done(function () {
                if (set !== null) {
                    for (var i = 0; i < set.CurrentPage().Items().length; i++) {
                        var e = set.CurrentPage().Items()[i];
                        if (e.CategoryID() == data.CategoryID() && e !== data) {
                            e.data.CategoryRef = data.CategoryRef();
                            e.CategoryRef(e.data.CategoryRef);
                            e.IsCategoryRefMaterialized(true);
                        }
                    }
                }
                $(event.currentTarget).qtip({
                    overwrite: true,
                    content: data.CategoryRef() ? data.CategoryRef().DistinctString : 'null',
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
        };

        self.display_CategoryRef = function (data, event) {
            $("#displayWindow").dialog('option', 'title', 'Product View');
            if (data.data.CategoryID !== null) {
                $("#displayWindow").dialog("open");
                if (!data.IsCategoryRefMaterialized()) {
                    data.MaterializeCategoryRef().done(function () {
                        $("#displayFrame")[0].src = '../Category/LoadEntityView?CategoryID=' + data.CategoryID();
                    });
                } else {
                    $("#displayFrame")[0].src = '../Category/LoadEntityView?CategoryID=' + data.CategoryID();
                }
            }
        };

        self.select_CategoryID = function (data, event) {
            var selBtns = {};
            selBtns[OKStr] = function () { 
                CategoryID_selected();
                $(this).dialog('close');
            }
            selBtns[CancelStr] = function () { 
                childSelectedEntity = null; 
                $(this).dialog('close');
            };
            $("#selectWindow").dialog('option', 'title', 'Category View');    
            $("#selectWindow").dialog('option', 'buttons', selBtns);    
            $("#selectWindow").dialog("open");
            currentUpdatingEntity = data;
            if (data.data !== null) {
                if (data.CategoryID() !== null) {
                    $("#selectFrame")[0].src = '../Category/SelectView?filter=' + encodeURIComponent('CategoryID !== ' + data.CategoryID());
                } else {
                    $("#selectFrame")[0].src = '../Category/SelectView?filter=';
                }
            } else {
                $("#selectFrame")[0].src = '../Category/SelectView?filter=';
            }
            event.stopPropagation();
            return false;
        };

        var CategoryID_selected = function () {
            if (currentUpdatingEntity !== null && childSelectedEntity !== null) {
                currentUpdatingEntity.CategoryID(childSelectedEntity.CategoryID());
            }
        };

        self.MaterializeSupplierRef = function (data, event) {
            data.MaterializeSupplierRef().done(function () {
                if (set !== null) {
                    for (var i = 0; i < set.CurrentPage().Items().length; i++) {
                        var e = set.CurrentPage().Items()[i];
                        if (e.SupplierID() == data.SupplierID() && e !== data) {
                            e.data.SupplierRef = data.SupplierRef();
                            e.SupplierRef(e.data.SupplierRef);
                            e.IsSupplierRefMaterialized(true);
                        }
                    }
                }
                $(event.currentTarget).qtip({
                    overwrite: true,
                    content: data.SupplierRef() ? data.SupplierRef().DistinctString : 'null',
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
        };

        self.display_SupplierRef = function (data, event) {
            $("#displayWindow").dialog('option', 'title', 'Product View');
            if (data.data.SupplierID !== null) {
                $("#displayWindow").dialog("open");
                if (!data.IsSupplierRefMaterialized()) {
                    data.MaterializeSupplierRef().done(function () {
                        $("#displayFrame")[0].src = '../Supplier/LoadEntityView?SupplierID=' + data.SupplierID();
                    });
                } else {
                    $("#displayFrame")[0].src = '../Supplier/LoadEntityView?SupplierID=' + data.SupplierID();
                }
            }
        };

        self.select_SupplierID = function (data, event) {
            var selBtns = {};
            selBtns[OKStr] = function () { 
                SupplierID_selected();
                $(this).dialog('close');
            }
            selBtns[CancelStr] = function () { 
                childSelectedEntity = null; 
                $(this).dialog('close');
            };
            $("#selectWindow").dialog('option', 'title', 'Supplier View');    
            $("#selectWindow").dialog('option', 'buttons', selBtns);    
            $("#selectWindow").dialog("open");
            currentUpdatingEntity = data;
            if (data.data !== null) {
                if (data.SupplierID() !== null) {
                    $("#selectFrame")[0].src = '../Supplier/SelectView?filter=' + encodeURIComponent('SupplierID !== ' + data.SupplierID());
                } else {
                    $("#selectFrame")[0].src = '../Supplier/SelectView?filter=';
                }
            } else {
                $("#selectFrame")[0].src = '../Supplier/SelectView?filter=';
            }
            event.stopPropagation();
            return false;
        };

        var SupplierID_selected = function () {
            if (currentUpdatingEntity !== null && childSelectedEntity !== null) {
                currentUpdatingEntity.SupplierID(childSelectedEntity.SupplierID());
            }
        };

        self.display_Order_Details = function (data, event) {
            if (!data.IsOrder_DetailsMaterialized()) {
                data.MaterializeOrder_Details().done(function () {
                    display_subset('Order_Detail', data.Order_Details());
                });
            } else {
                display_subset('Order_Detail', data.Order_Details());
            }
        };

        self.display_subset = function (setname, subset) {
            var url = dbBaseUrl + setname + '/MainFilteredView?filter=' + encodeURIComponent(subset.SetFilter);
            $("#displayWindow").dialog('option', 'title', setname + ' (' + subset.SetFilter + ')');
            $("#displayWindow").dialog("open");
            $("#displayFrame")[0].src = url;
        };

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
                    e = new Product(clientContext, oprs.ChangedEntities[0].UpdatedItem);
                    if (oprs.ConflictEntities !== null && oprs.ConflictEntities.length == 1) {
                        e.ConflictWithItem = new Product(clientContext, oprs.ConflictEntities[0].ConflictItem);
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
        };

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
        };

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
                                changedVM[i].ConflictWithItem = new Product(clientContext,  oprs.ConflictEntities[j].UpdatedItem);
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
        };

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
        };

        self.initialize = function (filter) {
            pageMgr.loadedModelTable['service-clients/scripts/Northwind/models/sets/Product'] = model;
            if (!self.set) {
                self.set = new model.entitySet();
                set = self.set;
            }
            return set.GetSetInfo(tkfilter, filter);
        };
    }
    return c;
})