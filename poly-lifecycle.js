(function() {
    "use strict";

    window.TB = window.TB || {};
    (TB.Lifecycle = function () {
        this.hasFired = {
            'DOMContentLoaded': false,
            'WebComponentsReady': false
        };

        this.listeners = [];

        this.notify = function (e) {
            this.hasFired[e.type] = true;
            for (var i = 0; i < this.listeners.length; i++) {
                var shouldFire = true;
                for (var j = 0; j < this.listeners[i][0].length; j++) {
                    if (!this.hasFired[this.listeners[i][0][j]]) {
                        shouldFire = false;
                        break;
                    }
                }
                if (shouldFire) {
                    this.listeners[i][1]();
                }
            }
        };

        this.onDOMReady = function (callback) {
            if (this.hasFired['DOMContentLoaded']) {
                callback();
            } else {
                this.listeners.push([['DOMContentLoaded'], callback]);
            }
        };

        this.onWCReady = function (callback) {
            if (this.hasFired['WebComponentsReady']) {
                callback();
            } else {
                this.listeners.push([['WebComponentsReady'], callback]);
            }
        };

        this.onReady = function (callback) {
            if (this.hasFired['DOMContentLoaded'] && this.hasFired['WebComponentsReady']) {
                callback();
            } else {
                this.listeners.push([['DOMContentLoaded', 'WebComponentsReady'], callback]);
            }
        };

        document.addEventListener('DOMContentLoaded', this.notify.bind(this), {once: true});
        document.addEventListener('WebComponentsReady', this.notify.bind(this), {once: true});
    }).call(TB.Lifecycle);
})();