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

define(['knockout', 'config'], function (ko, config) {

    var __page = function (url, content, data, op) {
        var self = this;
        //self.baseUrl = config.baseUrl + '/services/' + config.databaseName + '/';
        self.id = url;
        self.lastActive = false;
        self.content = content;
        self.mainDataModel = ko.observable(data);
        self.op = op;
        self.prevPage = null;
        self.nextPages = ko.observableArray([]);
    };

    var model = function () {
        var self = this;

        self.loadedModelTable = { };
        self.loadedControllerTable = { };
        self.contentContainer = typeof config.contentContainer == 'undefined' ? '.content-container' : config.contentContainer;
        self.entryPage = null;
        self.opContext = null;
        self.currentPage = ko.observable();
        self.pageChanged = ko.observable();

        self.prevPageExists = function () {
            var v = self.pageChanged();
            var p = self.currentPage();
            if (p == null)
                return false;
            var yes = self.entryPage !== null && self.entryPage.id !== p.id;
            if (yes) {
                setTimeout(function () {
                    $('.page-navigator .prev').css({ visibility: 'visible' });
                }, 100);
            }
            return yes;
        };

        self.hasPrevPage = ko.pureComputed(self.prevPageExists);

        self.homePageShortcut = function () {
            var v = self.pageChanged();
            var p = self.currentPage().prevPage;
            if (p == null)
                return false;
            var yes = self.entryPage !== null && self.entryPage.id !== p.id;
            if (yes) {
                setTimeout(function () {
                    $('.page-navigator .home').css({ visibility: 'visible' });
                }, 100);
            }
            return yes;
        };

        self.showHomePage = ko.pureComputed(self.homePageShortcut);

        self.nextPageExists = function () {
            var v = self.pageChanged();
            var p = self.currentPage();
            if (p == null)
                return false;
            var yes = self.entryPage !== null && p.nextPages().length > 0;
            if (yes) {
                setTimeout(function () {
                    $('.page-navigator .next').css({ visibility: 'visible' });
                }, 100);
            }
            return yes;
        };

        self.hasNextPage = ko.pureComputed(self.nextPageExists);

        self.showBlockList = ko.observable(false);

        self.currentDataModel = null;
        self.opContextType = null;
        self.categPath = '';

        self.loadModelModule = function (modelId, callback) {
            if (typeof self.loadedModelTable[modelId] !== 'undefined') {
                callback(self.loadedModelTable[modelId]);
            } else {
                requirejs([ modelId ], function(m) {
                    self.loadedModelTable[modelId] = m;
                    callback(m);
                });
            }
        };

        self.loadControllerModule = function (controllerId, callback) {
            if (typeof self.loadedControllerTable[controllerId] !== 'undefined') {
                callback(self.loadedControllerTable[controllerId]);
            } else {
                requirejs([ controllerId ], function(c) {
                    self.loadedControllerTable[controllerId] = c;
                    callback(c);
                });
            }
        };

        self.urlNavigate = function (uri, scripts, unloadHandler, data, op) {
            self.urlNavigateAsync(uri, scripts, unloadHandler, data, op)
            .done()
            .fail(function(jqxhr, textStatus, error) {
                if (typeof config.alert === 'function') {
                    config.alert(jqxhr.statusText + '\r\n\r\n' + jqxhr.responseText);
                } else {
                    alert(jqxhr.statusText + '\r\n\r\n' + jqxhr.responseText);
                }
            });
        };

        self.urlNavigateAsync = function (uri, scripts, unloadHandler, data, op) {
            var prevPage = self.currentPage();
            if (prevPage && 'function' == typeof prevPage.unloaded) {
                prevPage.unloaded();
            }
            var elm = $(self.contentContainer)[0];
            ko.cleanNode(elm);
            $(self.contentContainer).html('');
            var _data = typeof data == 'undefined' ? self.currentDataModel : data;
            var _op = typeof op == 'undefined' ? new self.opContextType(_data) : op;
            var url = /^http(s)?/.test(uri) || uri.indexOf('/') === 0 ? uri : self.categPath + '/' + uri;
            return self.loadPage(url, _data, _op).pipe(function (page) {
                self.currentDataModel = _data;
                $(self.contentContainer).html(page.content);
                if (typeof scripts !== 'undefined' && scripts) {
                    page.scripts = scripts;
                    for (var i = 0; i < scripts.length; i++) {
                        var s = scripts[i];
                        if (typeof s.module !== 'undefined') {
                            requirejs([ s.module ], function (module) {
                                if (typeof window[s.handler] === 'function') {
                                    if (typeof s.opts === 'undefined') {
                                        window[s.handler](module);
                                    } else {
                                        window[s.handler](module, s.opts);
                                    }
                                }
                            });
                        } else if (typeof window[s.handler] === 'function') {
                            if (typeof s.opts === 'undefined') {
                                window[s.handler]();
                            } else {
                                window[s.handler](s.opts);
                            }
                        }
                    }
                }
                if (typeof window[unloadHandler] === 'function') {
                    page.unloaded = window[unloadHandler];
                }
                ko.applyBindings(self, elm);
            });
        };

        self.goFirstPage = function (then) {
            var loader = function () {
                if (self.currentPage().prevPage == null)
                    return;
                var elm = $(self.contentContainer);
                ko.cleanNode(elm[0]);
                while (self.currentPage().prevPage !== null) {
                    var currPage = self.currentPage();
                    if ('function' == typeof currPage.unloaded) {
                        currPage.unloaded();
                    }
                    self.currentPage(currPage.prevPage);
                }
                elm.html('');
                var page = self.currentPage();
                self.currentDataModel = page.mainDataModel();
                elm.html(page.content);
                if (typeof page.scripts !== 'undefined') {
                    for (var i = 0; i < page.scripts.length; i++) {
                        var s = page.scripts[i];
                        if (typeof s.module !== 'undefined') {
                            requirejs([ s.module ], function (module) {
                                if (typeof window[s.handler] === 'function') {
                                    if (typeof s.opts === 'undefined') {
                                        window[s.handler](module);
                                    } else {
                                        window[s.handler](module, s.opts);
                                    }
                                }
                            });
                        } else if (typeof window[s.handler] === 'function') {
                            if (typeof s.opts === 'undefined') {
                                window[s.handler]();
                            } else {
                                window[s.handler](s.opts);
                            }
                        }
                    }
                }
                ko.applyBindings(self, elm[0]);
                if (typeof then === 'function') {
                    then();
                }
            };
            if (typeof config.pagetransitionHandler === 'function') {
                config.pagetransitionHandler('right', loader);
            } else {
                loader();
            }
        };

        self.goPrevPage = function (then) {
            var loader = function () {
                var prevPage = self.currentPage();
                if ('function' == typeof prevPage.unloaded) {
                    prevPage.unloaded();
                }
                var elm = $(self.contentContainer);
                ko.cleanNode(elm[0]);
                elm.html('');
                self.prevPage(function (page) {
                    self.currentDataModel = page.mainDataModel();
                    elm.html(page.content);
                    if (typeof page.scripts !== 'undefined') {
                        for (var i = 0; i < page.scripts.length; i++) {
                            var s = page.scripts[i];
                            if (typeof s.module !== 'undefined') {
                                requirejs([ s.module ], function (module) {
                                    if (typeof window[s.handler] === 'function') {
                                        if (typeof s.opts === 'undefined') {
                                            window[s.handler](module);
                                        } else {
                                            window[s.handler](module, s.opts);
                                        }
                                    }
                                });
                            } else if (typeof window[s.handler] === 'function') {
                                if (typeof s.opts === 'undefined') {
                                    window[s.handler]();
                                } else {
                                    window[s.handler](s.opts);
                                }
                            }
                        }
                    }
                    ko.applyBindings(self, elm[0]);
                    if (typeof then === 'function') {
                        then();
                    }
                });
            };
            if (typeof config.pagetransitionHandler === 'function') {
                config.pagetransitionHandler('right', loader);
            } else {
                loader();
            }
        };

        self.goNextPage = function (then) {
            var loader = function () {
                var prevPage = self.currentPage();
                if ('function' == typeof prevPage.unloaded) {
                    prevPage.unloaded();
                }
                var elm = $(self.contentContainer);
                ko.cleanNode(elm[0]);
                elm.html('');
                self.nextPage(function (page) {
                    self.currentDataModel = page.mainDataModel();
                    elm.html(page.content);
                    if (typeof page.scripts !== 'undefined') {
                        for (var i = 0; i < page.scripts.length; i++) {
                            var s = page.scripts[i];
                            if (typeof s.module !== 'undefined') {
                                requirejs([ s.module ], function (module) {
                                    if (typeof window[s.handler] === 'function') {
                                        if (typeof s.opts === 'undefined') {
                                            window[s.handler](module);
                                        } else {
                                            window[s.handler](module, s.opts);
                                        }
                                    }
                                });
                            } else if (typeof window[s.handler] === 'function') {
                                if (typeof s.opts === 'undefined') {
                                    window[s.handler]();
                                } else {
                                    window[s.handler](s.opts);
                                }
                            }
                        }
                    }
                    ko.applyBindings(self, elm[0]);
                    if (typeof then === 'function') {
                        then();
                    }
                });
            };
            if (typeof config.pagetransitionHandler === 'function') {
                config.pagetransitionHandler('left', loader);
            } else {
                loader();
            }
        };

        self.navigateTo = function(opts) {
            if (typeof self.ResolveRoute !== 'function') {
                if (typeof config.alert === 'function') {
                    config.alert('Routing information is not available to the current context.');
                } else {
                    alert('Routing information is not available to the current context.');
                }
                return;
            }
            var route = self.ResolveRoute(opts);
            if (!route || route == null)
                return;
            if (typeof route.controllerId !== 'undefined') {
                self.loadControllerModule(route.controllerId, function (opType) {
                    var op = new opType(opts.data);
                    self.urlNavigate(route.url, opts.scripts, opts.unloadHandler, opts.data, op);
                });
            } else if (typeof route.op !== 'undefined' || typeof route.data !== 'undefined') {
                self.urlNavigate(route.url, opts.scripts, opts.unloadHandler, route.data, route.op);
            }
        };

        self.refreshPage = function () {
            return $.ajax({
                url: self.currentPage().id,
                type: 'GET'
            }).pipe(function (content) {
                self.currentPage().content = content;
                return $.Deferred().resolve(self.currentPage());
            },
            function (jqxhr, textStatus, error) {
                return $.Deferred().reject(jqxhr, textStatus, error);
            });
        };

        self.loadPage = function (url, data, op) {
            return $.ajax({
                url: url,
                type: 'GET'
            }).pipe(function (content) {
                var page = null;
                if (self.entryPage == null) {
                    page = new __page(url, content, data, op);
                    self.entryPage = page;
                    self.currentPage(self.entryPage);
                    self.currentPage().lastActive = true;
                } else {
                    var inNext = false;
                    for (var i = 0; i < self.currentPage().nextPages().length; i++) {
                        self.currentPage().nextPages()[i].lastActive = false;
                        if (self.currentPage().nextPages()[i].id == url) {
                            page = self.currentPage().nextPages()[i];
                        } else {
                            self.currentPage().nextPages()[i].lastActive = false;
                        }
                    }
                    if (config.removePageAlterHistory) {
                        self.currentPage().nextPages.remove(function (p) {
                            return p.id !== url;
                        });
                    }
                    if (page == null) {
                        page = new __page(url, content, data, op);
                        page.prevPage = self.currentPage();
                        self.currentPage().nextPages().push(page);
                    } else {
                        page.content = content;
                    }
                    page.lastActive = true;
                    self.currentPage(page);
                    self.pageChanged(!self.pageChanged());
                }
                return $.Deferred().resolve(page);
            },
            function (jqxhr, textStatus, error) {
                return $.Deferred().reject(jqxhr, textStatus, error);
            });
        };

        self.prevPage = function (callback) {
            if (self.entryPage.id !== self.currentPage().id) {
                self.currentPage(self.currentPage().prevPage);
                if (typeof callback == 'function') {
                    callback(self.currentPage());
                }
            }
        };

        self.nextPage = function (callback) {
            if (self.currentPage().nextPages().length > 0) {
                for (var i = 0; i < self.currentPage().nextPages().length; i++) {
                    if (self.currentPage().nextPages()[i].lastActive) {
                        self.currentPage(self.currentPage().nextPages()[i]);
                        if (typeof callback == 'function') {
                            callback(self.currentPage());
                        }
                        return;
                    }
                }
                self.currentPage(self.currentPage().nextPages()[0]);
                if (typeof callback === 'function') {
                    callback(self.currentPage());
                }
            }
        };
        
        self.clearHistroy = function () {
            self.entryPage.nextPages([]);
            self.currentPage(self.entryPage);
        };

    };

    return new model();
});