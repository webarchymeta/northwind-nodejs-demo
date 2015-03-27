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

        self.LoadNotes = function (data, event) {
            data.LoadEntityNotes().done(function () {
                $(event.target).siblings().button();
            });
        }

        self.fileUploadNotes = function (data, event) {
            if (data.data !== null) {
                $("#displayWindow").dialog('option', 'title', uploadFileTitle);
                $("#displayWindow").dialog("open");
                $("#displayWindow").on("dialogclose", function (event, ui) {
                    data.IsNotesLoaded(false);
                });
                $("#displayFrame")[0].src = 'UpdateFileNotes?EmployeeID=' + data.data.EmployeeID;
            } else {

            }
        }

        self.LoadPhoto = function (data, event) {
            data.LoadEntityPhoto().done(function () {
                $(event.target).siblings().button();
            });
        }

        self.fileUploadPhoto = function (data, event) {
            if (data.data !== null) {
                $("#displayWindow").dialog('option', 'title', uploadFileTitle);
                $("#displayWindow").dialog("open");
                $("#displayWindow").on("dialogclose", function (event, ui) {
                    data.IsPhotoLoaded(false);
                });
                $("#displayFrame")[0].src = 'UpdateFilePhoto?EmployeeID=' + data.data.EmployeeID;
            } else {

            }
        }

        self.MaterializeUpperRef = function (data, event) {
            data.MaterializeUpperRef().done(function () {
                if (set !== null) {
                    for (var i = 0; i < set.CurrentPage().Items().length; i++) {
                        var e = set.CurrentPage().Items()[i];
                        if (e.ReportsTo() == data.ReportsTo() && e !== data) {
                            e.data.UpperRef = data.UpperRef();
                            e.UpperRef(e.data.UpperRef);
                            e.IsUpperRefMaterialized(true);
                        }
                    }
                }
                $(event.currentTarget).qtip({
                    overwrite: true,
                    content: data.UpperRef() ? data.UpperRef().DistinctString : 'null',
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

        self.display_UpperRef = function (data, event) {
            $("#displayWindow").dialog('option', 'title', 'Employee View');
            if (data.data.ReportsTo !== null) {
                $("#displayWindow").dialog("open");
                if (!data.IsUpperRefMaterialized()) {
                    data.MaterializeUpperRef().done(function () {
                        $("#displayFrame")[0].src = '../Employee/LoadEntityView?EmployeeID=' + data.ReportsTo();
                    });
                } else {
                    $("#displayFrame")[0].src = '../Employee/LoadEntityView?EmployeeID=' + data.ReportsTo();
                }
            }
        }

        self.select_ReportsTo = function (data, event) {
            var selBtns = {};
            selBtns[OKStr] = function () { 
                ReportsTo_selected();
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
                if (data.ReportsTo() !== null) {
                    $("#selectFrame")[0].src = '../Employee/SelectView?filter=' + encodeURIComponent('EmployeeID !== ' + data.ReportsTo());
                } else {
                    $("#selectFrame")[0].src = '../Employee/SelectView?filter=';
                }
            } else {
                $("#selectFrame")[0].src = '../Employee/SelectView?filter=';
            }
            event.stopPropagation();
            return false;
        }

        var ReportsTo_selected = function () {
            if (currentUpdatingEntity !== null && childSelectedEntity !== null) {
                currentUpdatingEntity.ReportsTo(childSelectedEntity.EmployeeID());
            }
        }

        self.display_Employees = function (data, event) {
            if (!data.IsEmployeesMaterialized()) {
                data.MaterializeEmployees().done(function () {
                    display_subset('Employee', data.Employees());
                });
            } else {
                display_subset('Employee', data.Employees());
            }
        }

        self.display_EmployeeTerritorys = function (data, event) {
            if (!data.IsEmployeeTerritorysMaterialized()) {
                data.MaterializeEmployeeTerritorys().done(function () {
                    display_subset('EmployeeTerritory', data.EmployeeTerritorys());
                });
            } else {
                display_subset('EmployeeTerritory', data.EmployeeTerritorys());
            }
        }

        self.display_Orders = function (data, event) {
            if (!data.IsOrdersMaterialized()) {
                data.MaterializeOrders().done(function () {
                    display_subset('Order', data.Orders());
                });
            } else {
                display_subset('Order', data.Orders());
            }
        }

        self.display_subset = function (setname, subset) {
            var url = dbBaseUrl + setname + '/MainFilteredView?filter=' + encodeURIComponent(subset.SetFilter);
            $("#displayWindow").dialog('option', 'title', setname + ' (' + subset.SetFilter + ')');
            $("#displayWindow").dialog("open");
            $("#displayFrame")[0].src = url;
        }

        self._loadEntityRoots = function (data, event) {
            set.LoadEntitySetRoots(data).done(function () {
            });
        }

        self._loadEntityHierarchy = function (data, event) {
            set.LoadEntityFullHierarchyRecurs(data).done(function () {
            });
        }

        self._loadChildNodes = function (data, event) {
            if (data.IsChildsLoaded()) {
                data.IsNodeExpanded(true);
            } else {
                $(event.target).addClass("waiting");
                data.LoadEntityChildren().done(function () {
                    data.IsNodeExpanded(true);
                    $(event.target).removeClass("waiting");
                }).fail(function (jqxhr, textStatus, error) {
                    $(event.target).removeClass("waiting");
                });
            }
        }

    }
    return c;
})