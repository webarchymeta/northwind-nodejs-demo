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
            if (self.set.IsQueryStateChanged()) {
                self.set.ResetPageState();
            }
            return self.set.NextPageBlock(qexpr, null, false).done(function () {
                if (self.set.CurrentPage() !== null && !(typeof self.set.CurrentPage().Items === 'undefined')) {
                    self.set.CurrentPage().Items.removeAll();
                }
                if (self.set.PageBlocks().length > 0 && self.set.PageBlocks()[0].Pages().length > 0) {
                    loadpage(0);
                }
            });
        };

        self.prevPageBlock = function () {
            if (loadingPage) {
                return;
            }
            var idx = self.set.CurrBlockIndex();
            if (idx > 0) {
                self.set.CurrBlockIndex(idx - 1);
                self.set.PagesWindow.removeAll();
                var ipage = -1;
                for (var i = 0; i < self.set.PageBlocks()[idx - 1].Pages().length; i++) {
                    var p = self.set.PageBlocks()[idx - 1].Pages()[i];
                    self.set.PagesWindow.push(p);
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
            var idx = self.set.CurrBlockIndex();
            if (idx < self.set.PageBlocks().length - 1) {
                self.set.CurrBlockIndex(idx + 1);
                self.set.PagesWindow.removeAll();
                var ipage = -1;
                for (var i = 0; i < self.set.PageBlocks()[idx + 1].Pages().length; i++) {
                    var p = self.set.PageBlocks()[idx + 1].Pages()[i];
                    self.set.PagesWindow.push(p);
                    if (p.IsPageSelected()) {
                        ipage = p.Index_();
                    }
                }
                loadpage(ipage == -1 ? 0 : ipage);
            } else {
                idx = self.set.PageBlocks().length - 1;
                var b = self.set.PageBlocks()[idx];
                if (!b.IsLastBlock()) {
                    self.set.CurrBlockIndex(idx + 1);
                    var p = b.LastPage();
                    if (p == null) {
                        return;
                    }
                    var qexpr = set.getQueryExpr();
                    var matched = self.set.EntityCount();
                    self.set.NextPageBlock(qexpr, p.LastItem(), false).done(function () {
                        self.set.EntityCount(matched);
                        if (self.set.PageBlocks().length > 0 && self.set.PageBlocks()[idx + 1].Pages().length > 0) {
                            loadpage(self.set.PageBlocks()[idx + 1].Pages()[0].Index_());
                        }
                    });
                }
            }
        };

        self.setCurrentPage = function(page) {
            loadpage(page.Index_());
        };

        var isMergingPage = false;

        self.mergeNextPage = function(callback) {
            if (!isMergingPage) {
                isMergingPage = true; 
                var blk = self.set.PageBlocks()[self.set.CurrBlockIndex()];
                if (blk.Pages().length > 1) {
                    var p0 = blk.Pages()[0];
                    var p1 = blk.Pages()[1];
                    if (!p1.IsDataLoaded()) {
                        p1.GetPageItems(self.set).done(function () {
                            _doMerge(blk, p0, p1);
                            if (typeof callback == 'function')
                                callback();
                            isMergingPage = false; 
                        });
                    } else {
                        _doMerge(blk, p0, p1);
                        if (typeof callback == 'function')
                            callback();
                        isMergingPage = false; 
                    }
                } else {
                    if (typeof callback == 'function') 
                        callback();
                    isMergingPage = false; 
                }
            }
        };

        var _doMerge = function(blk, p0, p1) {
            for (var i = 0; i < p1.Items().length; i++) {
                p0.Items.push(p1.Items()[i]);
            }
            p0.LastItem(p1.LastItem());
            p1.Items.removeAll();
            blk.Pages.remove(function(p) {
                return p.Index_() == p1.Index_();
            });
            for (var i = 0; i < blk.Pages().length; i++) {
                blk.Pages()[i].Index_(i);
            }
        };

        self.setCurrentPageBlock = function (blk) {
            self.set.CurrBlockIndex(blk.BlockIndex());
            self.set.CurrentPage(blk.Pages()[0]);
        };

        var loadpage = function (index) {
            if (loadingPage) {
                return;
            }
            loadingPage = true;
            var p = null;
            var p0 = null;
            var blk = self.set.PageBlocks()[self.set.CurrBlockIndex()];
            for (var i = 0; i < blk.Pages().length; i++) {
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
                    p.GetPageItems(self.set, pageItemsLoader).done(function () {
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
            self.set.CurrentPage(p);
            p.IsPageSelected(true);
            if (p0 !== null) {
                p0.IsPageSelected(false);
            }
            if (self.set.CurrentPage().CurrentItem() !== null) {
                updateEntityDetails();
            }
        };

        var updateEntityDetails = function () {

        };

        self.selectEntity = function (data, event) {
            for (var i = 0; i < self.set.CurrentPage().Items().length; i++) {
                var e = self.set.CurrentPage().Items()[i];
                if (e.IsEntitySelected() && e !== data) {
                    e.IsEntitySelected(false);
                }
            }
            data.IsEntitySelected(true);
            self.set.CurrentPage().CurrentItem(data);
            updateEntityDetails();
            if (typeof parent !== 'undefined' && parent !== null) {
                parent.childSelectedEntity = data;
            }
            if (event.target.localName == 'a')
                return true;
            else {
                event.stopPropagation();
                return false;
            }
        };

        self.initialize = function (filter) {
            pageMgr.loadedModelTable['service-clients/scripts/Northwind/models/sets/Region'] = model;
            if (!self.set) {
                self.set = new model.entitySet();
                set = self.set;
            }
            return self.set.GetSetInfo(tkfilter, filter);
        };
    }
    return c;
})