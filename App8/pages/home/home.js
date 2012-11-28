/// <reference path="../../js/data.js" />
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            
            var waitlist = element.getElementsByClassName('waitlist')[0];
            this._waitlistView = waitlist.winControl;
            this._waitlistView.itemDataSource = Guam.Data.list.dataSource;
            this._waitlistView.oniteminvoked = this._itemInvoked.bind(this)

        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />
            this._waitlistView.forceLayout();
        },

        _itemInvoked: function (args) {
            var entry = Guam.Data.list.getAt(args.detail.itemIndex);
            WinJS.Navigation.navigate('/pages/detail/detail.html', { entry: entry });
        }

    });

    window.addEventListener('keyup', function (e) {
        if (WinJS.Navigation.location !== '/pages/home/home.html')
            return;
        var isLetter = (e.key >= 'a' && e.key <= 'z') ||
            (e.key >= 'A' && e.key <= 'Z');
        if (!isLetter) return;
        var searchPane = Windows.ApplicationModel.Search.SearchPane.getForCurrentView();
        searchPane.show(e.key);
    });

})();
