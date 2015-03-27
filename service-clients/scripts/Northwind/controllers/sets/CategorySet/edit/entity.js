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

        self.LoadDescription = function (data, event) {
            data.LoadEntityDescription().done(function () {
                $(event.target).siblings().button();
            });
        }

        self.fileUploadDescription = function (data, event) {
            if (data.data !== null) {
                $("#displayWindow").dialog('option', 'title', uploadFileTitle);
                $("#displayWindow").dialog("open");
                $("#displayWindow").on("dialogclose", function (event, ui) {
                    data.IsDescriptionLoaded(false);
                });
                $("#displayFrame")[0].src = 'UpdateFileDescription?CategoryID=' + data.data.CategoryID;
            } else {

            }
        }

        self.LoadPicture = function (data, event) {
            data.LoadEntityPicture().done(function () {
                $(event.target).siblings().button();
            });
        }

        self.fileUploadPicture = function (data, event) {
            if (data.data !== null) {
                $("#displayWindow").dialog('option', 'title', uploadFileTitle);
                $("#displayWindow").dialog("open");
                $("#displayWindow").on("dialogclose", function (event, ui) {
                    data.IsPictureLoaded(false);
                });
                $("#displayFrame")[0].src = 'UpdateFilePicture?CategoryID=' + data.data.CategoryID;
            } else {

            }
        }

        self.display_Products = function (data, event) {
            if (!data.IsProductsMaterialized()) {
                data.MaterializeProducts().done(function () {
                    display_subset('Product', data.Products());
                });
            } else {
                display_subset('Product', data.Products());
            }
        }

        self.display_subset = function (setname, subset) {
            var url = dbBaseUrl + setname + '/MainFilteredView?filter=' + encodeURIComponent(subset.SetFilter);
            $("#displayWindow").dialog('option', 'title', setname + ' (' + subset.SetFilter + ')');
            $("#displayWindow").dialog("open");
            $("#displayFrame")[0].src = url;
        }

    }
    return c;
})