/// <reference path="../../js/sms.js" />
// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/detail/detail.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            this._entry = options.entry;
            WinJS.Binding.processAll(element, this._entry);

            element
                .querySelector('button.tableReady')
                .addEventListener('click', this._tableReady.bind(this));
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        },

        _tableReady: function (e) {
            e.preventDefault();
            var entry = this._entry;
            var text = 'We\'re ready for you ' + entry.name;
            entry.setProperty('state', 'Sending');
            var sms = Guam.Sms.send(text, '61414275989')
                .then(
                    function complete() {
                        entry.setProperty('state', 'Notified');
                    },
                    function error() {
                        entry.setProperty('state', 'Failed');
                    }
                );
            WinJS.Navigation.back();
        }
    });
})();
