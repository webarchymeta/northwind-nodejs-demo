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
        };

        self.display_EmployeeRef = function (data, event) {
            $("#displayWindow").dialog('option', 'title', 'EmployeeTerritory View');
            $("#displayWindow").dialog("open");
            if (!data.IsEmployeeRefMaterialized()) {
                data.MaterializeEmployeeRef().done(function () {
                    $("#displayFrame")[0].src = '../Employee/LoadEntityView?EmployeeID=' + data.EmployeeID();
                });
            } else {
                $("#displayFrame")[0].src = '../Employee/LoadEntityView?EmployeeID=' + data.EmployeeID();
            }
        };

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
                $("#selectFrame")[0].src = '../Employee/SelectView?filter=' + encodeURIComponent('EmployeeID !== ' + data.EmployeeID());
            } else {
                $("#selectFrame")[0].src = '../Employee/SelectView?filter=';
            }
            event.stopPropagation();
            return false;
        };

        var EmployeeID_selected = function () {
            if (currentUpdatingEntity !== null && childSelectedEntity !== null) {
                currentUpdatingEntity.EmployeeID(childSelectedEntity.EmployeeID());
            }
        };

        self.MaterializeTerritoryRef = function (data, event) {
            data.MaterializeTerritoryRef().done(function () {
                if (set !== null) {
                    for (var i = 0; i < set.CurrentPage().Items().length; i++) {
                        var e = set.CurrentPage().Items()[i];
                        if (e.TerritoryID() == data.TerritoryID() && e !== data) {
                            e.data.TerritoryRef = data.TerritoryRef();
                            e.TerritoryRef(e.data.TerritoryRef);
                            e.IsTerritoryRefMaterialized(true);
                        }
                    }
                }
                $(event.currentTarget).qtip({
                    overwrite: true,
                    content: data.TerritoryRef() ? data.TerritoryRef().DistinctString : 'null',
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

        self.display_TerritoryRef = function (data, event) {
            $("#displayWindow").dialog('option', 'title', 'EmployeeTerritory View');
            $("#displayWindow").dialog("open");
            if (!data.IsTerritoryRefMaterialized()) {
                data.MaterializeTerritoryRef().done(function () {
                    $("#displayFrame")[0].src = '../Territory/LoadEntityView?TerritoryID=' + data.TerritoryID();
                });
            } else {
                $("#displayFrame")[0].src = '../Territory/LoadEntityView?TerritoryID=' + data.TerritoryID();
            }
        };

        self.select_TerritoryID = function (data, event) {
            var selBtns = {};
            selBtns[OKStr] = function () { 
                TerritoryID_selected();
                $(this).dialog('close');
            }
            selBtns[CancelStr] = function () { 
                childSelectedEntity = null; 
                $(this).dialog('close');
            };
            $("#selectWindow").dialog('option', 'title', 'Territory View');    
            $("#selectWindow").dialog('option', 'buttons', selBtns);    
            $("#selectWindow").dialog("open");
            currentUpdatingEntity = data;
            if (data.data !== null) {
                $("#selectFrame")[0].src = '../Territory/SelectView?filter=' + encodeURIComponent('TerritoryID !== ' + data.TerritoryID());
            } else {
                $("#selectFrame")[0].src = '../Territory/SelectView?filter=';
            }
            event.stopPropagation();
            return false;
        };

        var TerritoryID_selected = function () {
            if (currentUpdatingEntity !== null && childSelectedEntity !== null) {
                currentUpdatingEntity.TerritoryID(childSelectedEntity.TerritoryID());
            }
        };

    }
    return c;
})