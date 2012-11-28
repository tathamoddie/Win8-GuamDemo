/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
(function () {
    "use strict";

    var send = function (text, to) {
        var data = new FormData();
        data.append('text', text);
        data.append('to', to);
        var xhrOptions = {
            type: 'POST',
            url: 'http://giveusaminute.com/services/send-text',
            data: data
        };
        return WinJS.xhr(xhrOptions);
    };

    WinJS.Namespace.define("Guam.Sms", {
        send: send
    });

})();