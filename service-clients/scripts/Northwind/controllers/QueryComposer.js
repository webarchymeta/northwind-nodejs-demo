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

define(['knockout', 'queryModels', 'queryTerms'], function (ko, q, tkfilter) {
    
    var _option = function (data, p) {
        this.label = data.label;
        this.value = data.value;
        this.parent = p;
        this.selecting = ko.observable(false);
    };
    
    var _termMatch = function (word1, word2) {
        return word1.toLowerCase().indexOf(word2.toLowerCase()) == 0;
    }

    var _sorter = function (parent, set) {

        var self = this;
        var deleting = false;
        var editor = parent;
        var s = set;
        
        self.expr = ko.observable();
        self.enabled = ko.observable(true);
        self.hint = ko.observable('');
        self.options = ko.observableArray([]);
        self.word = ko.observable('');
        
        self.showHint = ko.observable(false);
        self.showOpts = ko.observable(false);
        self.showInput = ko.observable(true);

        var nextToken = function (tk) {
            s.SorterPath.push(tk);
            if (tk == null || tk.TkName !== 'asc' && tk.TkName !== 'desc') {
                editor.enableQuery(false);
                editor.filter.showInput(false);
            } else {
                editor.enableQuery(true);
                editor.filter.showInput(true);
                s.IsQueryStateChanged(true);
            }
            self.enabled(false);
            s.GetNextSorterOps(tkfilter).done(function () {
                self.enabled(true);
                if (s.CurrentSorters().Options.length == 2 && s.CurrentSorters().Options[0].IsExternal) {
                    s.CurrentSorters().Options[0].TkClass += ' fa fa-chevron-up';
                    s.CurrentSorters().Options[1].TkClass += ' fa fa-chevron-down';
                }
                if (s.CurrentSorters().CanBeClosed && s.CurrentSorters().CurrentExpr() !== null && s.CurrentSorters().CurrentExpr() !== '') {
                    self.expr(s.CurrentSorters().CurrentExpr());
                }
            }).fail(function (jqxhr, textStatus, error) {
            });
        }

        self.onkeydown = function (data, event) {
            deleting = event.which == 8;
            if (event.which == 8 && s.SorterPath().length > 0 && event.target.value == '') {
                var val = s.SorterPath.pop();
                event.target.value = val.DisplayAs;
                s.CurrentSorters(s.SortersStack.pop());
                self.showOpts(false);
                var tk = s.SorterPath().length > 0 ? s.SorterPath()[s.SorterPath().length - 1] : null;
                if (tk == null || tk.TkName !== 'asc' && tk.TkName !== 'desc') {
                    editor.enableQuery(false);
                    editor.filter.showInput(false);
                } else {
                    editor.enableQuery(true);
                    editor.filter.showInput(true);
                }
                return false;
            } else if ((event.which == 39 || event.which == 40)) {
                var _word = event.target.value;
                if (!self.showOpts()) {
                    var opts = s.CurrentSorters().Options;
                    var arr = opts.filter(function (val) {
                        return _termMatch(val.DisplayAs, _word);
                    });
                    if (arr.length !== 1) {
                        self.options.removeAll();
                        for (var i = 0; i < arr.length; i++) {
                            self.options.push(new _option({ label: arr[i].DisplayAs, value: arr[i].DisplayAs }, self));
                        }
                        self.showOpts(arr.length > 0);
                    } else if (arr.length === 1) {
                        self.showOpts(false);
                        var tk = arr[0];
                        event.target.value = '';
                        prev_term = '';
                        nextToken(tk);
                    }
                    return false;
                } else if (event.which == 40) {
                    handleKeyScroll(data, event);
                    return false;
                }
            } else if (event.which == 38) {
                if (self.showOpts()) {
                    handleKeyScroll(data, event);
                }
                return false;
            }
            return true;
        };
        
        var selectIdx = -1;

        var handleKeyScroll = function (data, event) {
            if (self.showOpts()) {
                if (event.which == 40) {
                    if (selectIdx > -1 && selectIdx < self.options().length) {
                        event.target.value = self.options()[selectIdx].selecting(false);
                    }
                    var idx = ++selectIdx;
                    if (idx >= self.options().length) {
                        event.target.value = '';
                        selectIdx = -1;
                    } else {
                        event.target.value = self.options()[idx].label;
                        self.options()[idx].selecting(true);
                    }
                    prev_term = event.target.value;
                } else if (event.which == 38) {
                    if (selectIdx > -1 && selectIdx < self.options().length) {
                        event.target.value = self.options()[selectIdx].selecting(false);
                    }
                    var idx = --selectIdx;
                    if (idx < 0) {
                        selectIdx = self.options().length;
                        event.target.value = '';
                    } else {
                        event.target.value = self.options()[idx].label;
                        self.options()[idx].selecting(true);
                    }
                    prev_term = event.target.value;
                }
            }
        }
        
        var prev_term = '';

        self.onkeyup = function (data, event) {
            if (event.which !== 8 && event.which !== 13 && event.target.value.length == prev_term.length)
                return;
            selectIdx = -1;
            var opts = s.CurrentSorters().Options;
            var _word = event.target.value;
            prev_term = _word;
            var arr = opts.filter(function (val) {
                if (event.which !== 13)
                    return _termMatch(val.DisplayAs, _word);
                else
                    return val.DisplayAs == _word;
            });
            if (arr.length !== 1 || deleting) {
                self.options.removeAll();
                for (var i = 0; i < arr.length; i++) {
                    self.options.push(new _option({ label: arr[i].DisplayAs, value: arr[i].DisplayAs }, self));
                }
                self.showOpts(arr.length > 0);
            } else {
                self.showOpts(false);
                var tk = arr[0];
                event.target.value = '';
                prev_term = '';
                nextToken(tk);
            }
        };
        
        self.oninputfocusout = function (data, event) {
            if (self.showOpts()) {
                var _word = self.word();
                var arr = s.CurrentSorters().Options.filter(function (val) {
                    return val.DisplayAs == _word;
                });
                if (arr.length == 1) {
                    var tk = arr[0];
                    event.target.value = '';
                    prev_term = '';
                    nextToken(tk);
                    event.target.focus();
                }
                self.showOpts(false);
            }
        };

        self.onmouseover = function (data, event) {
            for (var i = 0; i < self.options().length; i++) {
                if (self.options()[i].label == data.label) {
                    self.options()[i].selecting(true);
                    self.word(data.label);
                } else if (self.options()[i].selecting()) {
                    self.options()[i].selecting(false);
                }
            }
        };

    }

    var _filter = function (parent, set) {

        var self = this;
        var deleting = false;
        var editor = parent;
        var s = set;
        
        self.expr = ko.observable();
        self.enabled = ko.observable(true);
        self.word = ko.observable('');
        self.hint = ko.observable('');
        self.options = ko.observableArray([]);
        self.showHint = ko.observable(false);
        self.showOpts = ko.observable(false);
        self.showInput = ko.observable(false);

        var showingHint;

        var nextToken = function (tk) {
            s.FilterPath.push(tk);
            self.enabled(false);
            s.GetNextFilterOps(tkfilter).done(function () {
                self.enabled(true);
                var closed = s.CurrentFilters().CanBeClosed;
                editor.enableQuery(closed);
                if (closed)
                    s.IsQueryStateChanged(true);
                if (s.CurrentFilters().CanBeClosed && s.CurrentFilters().CurrentExpr() !== null && s.CurrentFilters().CurrentExpr() !== '') {
                    self.expr(s.CurrentFilters().CurrentExpr());
                }
            }).fail(function (jqxhr, textStatus, error) {
            });
        };

        self.onkeydown = function (data, event) {
            deleting = event.which == 8;
            if (event.which == 8 && s.FilterPath().length > 0 && event.target.value == '') {
                var val = s.FilterPath.pop();
                event.target.value = val.DisplayAs;
                s.CurrentFilters(s.FiltersStack.pop());
                var closed = s.CurrentFilters().CanBeClosed;
                s.FilterClosed(closed);
                editor.enableQuery(closed);
                if (closed)
                    s.IsQueryStateChanged(true);
                return false;
            } else if ((event.which == 39 || event.which == 40)) {
                var _word = event.target.value;
                if (!self.showOpts()) {
                    var opts = s.CurrentFilters().Options;
                    var arr = opts.filter(function (val) {
                        return _termMatch(val.DisplayAs, _word);
                    });
                    if (arr.length !== 1) {
                        self.options.removeAll();
                        for (var i = 0; i < arr.length; i++) {
                            self.options.push(new _option({ label: arr[i].DisplayAs, value: arr[i].DisplayAs }, self));
                        }
                        self.showOpts(arr.length > 0);
                    } else if (arr.length === 1) {
                        self.showOpts(false);
                        var tk = arr[0];
                        event.target.value = '';
                        prev_term = '';
                        nextToken(tk);
                    }
                    return arr.length == 0;
                } else if (event.which == 40) {
                    handleKeyScroll(data, event);
                    return false;
                }
            } else if (event.which == 38) {
                if (self.showOpts()) {
                    handleKeyScroll(data, event);
                }
                return false;
            } else {
                if (s.CurrentFilters().Hint !== null && s.CurrentFilters().Hint !== '') {
                    if (!showingHint) {
                        self.showHint(true);
                        self.hint(s.CurrentFilters().Hint);
                        showingHint = true;
                    }
                } else {
                    if (showingHint) {
                        self.showHint(false);
                        showingHint = false;
                    }
                }
            }
            return true;
        };

        var selectIdx = -1;
        
        var handleKeyScroll = function (data, event) {
            if (self.showOpts()) {
                if (event.which == 40) {
                    if (selectIdx > -1 && selectIdx < self.options().length) {
                        event.target.value = self.options()[selectIdx].selecting(false);
                    }
                    var idx = ++selectIdx;
                    if (idx >= self.options().length) {
                        event.target.value = '';
                        selectIdx = -1;
                    } else {
                        event.target.value = self.options()[idx].label;
                        self.options()[idx].selecting(true);
                    }
                    prev_term = event.target.value;
                } else if (event.which == 38) {
                    if (selectIdx > -1 && selectIdx < self.options().length) {
                        event.target.value = self.options()[selectIdx].selecting(false);
                    }
                    var idx = --selectIdx;
                    if (idx < 0) {
                        selectIdx = self.options().length;
                        event.target.value = '';
                    } else {
                        event.target.value = self.options()[idx].label;
                        self.options()[idx].selecting(true);
                    }
                    prev_term = event.target.value;
                }
            }
            return true;
        }

        var addValue = function (word) {
            selectIdx = -1;
            var tk;
            if (s.CurrentFilters().QuoteVal) {
                var strv = '';
                if (word.length == 0 || word[0] !== '"' || word[word.length - 1] !== '"') {
                    var scnt = 0;
                    for (var i = 0; i < word.length; i++) {
                        var c = word[i];
                        if (c == '"') {
                            for (j = 0; j < scnt; j++)
                                strv += '\\\\';
                            strv += '\\';
                            strv += c;
                            scnt = 0;
                        } else if (c == '\\') {
                            scnt++;
                        } else {
                            for (j = 0; j < scnt; j++)
                                strv += '\\\\';
                            strv += c;
                            scnt = 0;
                        }
                    }
                    tk = new q.QToken('"' + strv + '"');
                } else
                    tk = new q.QToken(word);
                tk.TkClass = 'filternode StringValue';
            } else {
                tk = new q.QToken(word);
                tk.TkClass = 'filternode Value';
            }
            if (showingHint) {
                self.showHint(false);
                showingHint = false;
            }
            nextToken(tk);
        }

        var prev_term = '';
        
        self.onkeyup = function (data, event) {
            var _word = event.target.value;
            var opts = s.CurrentFilters().Options;
            if (event.which !== 8 && event.which !== 13 && _word.length == prev_term.length)
                return;
            if (event.which == 13 && _word !== '' && opts.length == 0) {
                addValue(_word);
                event.target.value = '';
            } else {
                selectIdx = -1;
                prev_term = _word;
                var arr = opts.filter(function (val) {
                    if (event.which !== 13)
                        return _termMatch(val.DisplayAs, _word);
                    else
                        return val.DisplayAs == _word;
                });
                if (arr.length !== 1 || deleting) {
                    self.options.removeAll();
                    for (var i = 0; i < arr.length; i++) {
                        self.options.push(new _option({ label: arr[i].DisplayAs, value: arr[i].DisplayAs }, self));
                    }
                    self.showOpts(arr.length > 0);
                } else {
                    self.showOpts(false);
                    var tk = arr[0];
                    event.target.value = '';
                    prev_term = '';
                    nextToken(tk);
                }
            }
        };

        self.oninputfocus = function (data, event) {
            if (s.CurrentFilters() == null) {
                self.enabled(false);
                s.GetNextFilterOps(tkfilter).done(function () {
                    self.enabled(true);
                }).fail(function (jqxhr, textStatus, error) {
                });
            }
        };
        
        self.oninputfocusout = function (data, event) {
            var opts = s.CurrentFilters().Options;
            if (self.showOpts()) {
                var _word = self.word();
                var arr = opts.filter(function (val) {
                    return val.DisplayAs == _word;
                });
                if (arr.length == 1) {
                    var tk = arr[0];
                    event.target.value = '';
                    prev_term = '';
                    nextToken(tk);
                    event.target.focus();
                }
                self.showOpts(false);
            } else if (opts.length == 0 && event.target.value.length > 0) {
                var w = event.target.value;
                if (w[0] == '"' && w[w.length - 1] == '"' || w[0] !== '"' && w[w.length - 1] !== '"') {
                    event.target.value = '';
                    addValue(w);
                }
            }
        };

        self.onmouseover = function (data, event) {
            for (var i = 0; i < self.options().length; i++) {
                if (self.options()[i].label == data.label) {
                    self.options()[i].selecting(true);
                    self.word(data.label);
                } else if (self.options()[i].selecting()) {
                    self.options()[i].selecting(false);
                }
            }
        };
    }

    var _query = function (params, tkCustomizer) {
        tkfilter = tkCustomizer || tkfilter;
        this.set = params.s();
        this.set.QueryComposer = this;
        this.enableQuery = ko.observable(false);
        this.sorter = new _sorter(this, this.set);
        this.filter = new _filter(this, this.set);
        //this.set.RefreshSetState();
        if (this.set.SorterPath().length > 0) {
           var lasttk = this.set.SorterPath()[this.set.SorterPath().length - 1];
           this.filter.showInput(lasttk.TkName == 'asc' || lasttk.TkName == 'desc');
        }
        this.enableQuery(this.filter.showInput() && (this.set.CurrentFilters() == null || this.set.CurrentFilters().CanBeClosed));
    }
    return _query;

})