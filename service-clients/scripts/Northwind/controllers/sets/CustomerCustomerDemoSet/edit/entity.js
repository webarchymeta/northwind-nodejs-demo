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
            $("#displayWindow").dialog('option', 'title', 'CustomerCustomerDemo View');
            $("#displayWindow").dialog("open");
            if (!data.IsCustomerRefMaterialized()) {
                data.MaterializeCustomerRef().done(function () {
                    $("#displayFrame")[0].src = '../Customer/LoadEntityView?CustomerID=' + data.CustomerID();
                });
            } else {
                $("#displayFrame")[0].src = '../Customer/LoadEntityView?CustomerID=' + data.CustomerID();
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
                $("#selectFrame")[0].src = '../Customer/SelectView?filter=' + encodeURIComponent('CustomerID !== ' + data.CustomerID());
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

        self.MaterializeCustomerDemographicRef = function (data, event) {
            data.MaterializeCustomerDemographicRef().done(function () {
                if (set !== null) {
                    for (var i = 0; i < set.CurrentPage().Items().length; i++) {
                        var e = set.CurrentPage().Items()[i];
                        if (e.CustomerTypeID() == data.CustomerTypeID() && e !== data) {
                            e.data.CustomerDemographicRef = data.CustomerDemographicRef();
                            e.CustomerDemographicRef(e.data.CustomerDemographicRef);
                            e.IsCustomerDemographicRefMaterialized(true);
                        }
                    }
                }
                $(event.currentTarget).qtip({
                    overwrite: true,
                    content: data.CustomerDemographicRef() ? data.CustomerDemographicRef().DistinctString : 'null',
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

        self.display_CustomerDemographicRef = function (data, event) {
            $("#displayWindow").dialog('option', 'title', 'CustomerCustomerDemo View');
            $("#displayWindow").dialog("open");
            if (!data.IsCustomerDemographicRefMaterialized()) {
                data.MaterializeCustomerDemographicRef().done(function () {
                    $("#displayFrame")[0].src = '../CustomerDemographic/LoadEntityView?CustomerTypeID=' + data.CustomerTypeID();
                });
            } else {
                $("#displayFrame")[0].src = '../CustomerDemographic/LoadEntityView?CustomerTypeID=' + data.CustomerTypeID();
            }
        }

        self.select_CustomerTypeID = function (data, event) {
            var selBtns = {};
            selBtns[OKStr] = function () { 
                CustomerTypeID_selected();
                $(this).dialog('close');
            }
            selBtns[CancelStr] = function () { 
                childSelectedEntity = null; 
                $(this).dialog('close');
            };
            $("#selectWindow").dialog('option', 'title', 'CustomerDemographic View');    
            $("#selectWindow").dialog('option', 'buttons', selBtns);    
            $("#selectWindow").dialog("open");
            currentUpdatingEntity = data;
            if (data.data !== null) {
                $("#selectFrame")[0].src = '../CustomerDemographic/SelectView?filter=' + encodeURIComponent('CustomerTypeID !== ' + data.CustomerTypeID());
            } else {
                $("#selectFrame")[0].src = '../CustomerDemographic/SelectView?filter=';
            }
            event.stopPropagation();
            return false;
        }

        var CustomerTypeID_selected = function () {
            if (currentUpdatingEntity !== null && childSelectedEntity !== null) {
                currentUpdatingEntity.CustomerTypeID(childSelectedEntity.CustomerTypeID());
            }
        }

    }
    return c;
})