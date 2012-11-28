/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="//Microsoft.WinJS.1.0/js/ui.js" />

(function () {
    "use strict";

    var app = WinJS.Application;

    var Person = WinJS.Class.define(
        function (name) {
            this._initObservable();
            this.name = name;
            this.state = 'Waiting';
        }
    );

    WinJS.Class.mix(
        Person,
        WinJS.Binding.mixin,
        WinJS.Binding.expandProperties({ state: '' })
    );

    var list = new WinJS.Binding.List();
    app.roaming.readText('names.json')
        .then(function (file) {
            if (file) {
                JSON
                    .parse(file)
                    .map(function (name) { return new Person(name); })
                    .forEach(function (person) { list.push(person); });
            }
            else {
                list.push(new Person('Tom'));
                list.push(new Person('Tatham'));
            }
        });

    var add = function (name) {
        list.push(new Person(name));
    };

    var checkpoint = function () {
        var namesJson = JSON.stringify(list.map(function (item) { return item.name; }));
        return app.roaming.writeText('names.json', namesJson);
    };

    WinJS.Namespace.define("Guam.Data", {
        list: list,
        add: add,
        checkpoint: checkpoint
    });

})();