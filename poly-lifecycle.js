(function() {
    "use strict";

    window.TB = window.TB || {};
    (TB.Lifecycle = function () {
        var a = 'DOMContentLoaded';
        var b = 'WebComponentsReady';

        this.fired = {
            a: false,
            b: false
        };

        this.listeners = [];

        this.hasFired = function (events) {
            for (var i = 0; i < events.length; i++) {
                if (!this.fired[events[i]]) {
                    return false;
                }
            }
            return true;
        };

        this.notify = function (e) {
            this.fired[e.type] = true;
            var listener,
                listeners = [];
            while (0 < this.listeners.length) {
                listener = this.listeners.shift();
                if (this.hasFired(listener[0])) {
                    listener[1]();
                } else {
                    listeners.push(listener);
                }
            }
            this.listeners = listeners;
        };

        this.on = function (events, callback) {
            if (this.hasFired(events)) {
                callback();
            } else {
                this.listeners.push([events, callback]);
            }
        };

        this.onDOMReady = function (callback) {
            this.on([a], callback);
        };

        this.onWCReady = function (callback) {
            this.on([b], callback);
        };

        this.onReady = function (callback) {
            this.on([a, b], callback);
        };

        document.addEventListener(a, this.notify.bind(this), {once: true});
        document.addEventListener(b, this.notify.bind(this), {once: true});
    }).call(TB.Lifecycle);
})();