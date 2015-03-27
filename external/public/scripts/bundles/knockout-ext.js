define(['knockoutjs'], function (ko) {

    ko.bindingHandlers.datetimepicker = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            //initialize datepicker with some optional options
            var options = allBindingsAccessor().datepickerOptions || {};
            var funcOnSelectdate = function () {
                var observable = valueAccessor();
                observable($(element).datetimepicker("getDate"));
            }
            options.onSelect = funcOnSelectdate;
            $(element).datetimepicker(options);
            //handle the field changing
            ko.utils.registerEventHandler(element, "change", funcOnSelectdate);
            //handle disposal (if KO removes by the template binding)
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).datetimepicker("destroy");
            });
        },
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            var current = $(element).datetimepicker("getDate");
            if (value - current !== 0) {
                $(element).datetimepicker("setDate", value);
            }
        }
    };
    ko.bindingHandlers.localdatetime = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                if (typeof $(element).datetimepicker == 'function') {
                    $(element).datetimepicker("destroy");
                }
            });
        },
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());
            var current = $(element).text();
            if (value - current !== 0) {
                $(element).text(value.toLocaleString());
            }
        }
    }

    return ko;
});