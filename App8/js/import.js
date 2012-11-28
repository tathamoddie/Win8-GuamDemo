/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    "use strict";

    var start = function () {
        var pickers = Windows.Storage.Pickers;
        var picker = new pickers.FileOpenPicker();
        picker.viewMode = pickers.PickerViewMode.list;
        picker.suggestedStartLocation = pickers.PickerLocationId.documentsLibrary;
        picker.fileTypeFilter.replaceAll(['.txt']);
        picker
            .pickSingleFileAsync()
            .then(function (file) {
                if (!file) return;
                return Windows.Storage.FileIO.readLinesAsync(file);
            })
            .then(function (lines) {
                lines.forEach(function (line) {
                    Guam.Data.add(line);
                });
            });
    };

    WinJS.Namespace.define("Guam.Import", {
        start: start
    });
})();
