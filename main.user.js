// ==UserScript==
// @name         Ak's IBTaskMaker Paywall Bypass
// @version      5.0
// @description  Good luck on your studies.
// @author       MiniFishDabz
// @match        https://ibtaskmaker.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const forceFree = () => {
        window.FA = true;
        window.freeAccessID = 999999999999;

        Object.defineProperty(window, 'FA', {
            get: () => true,
            set: () => {},
            configurable: true
        });

        Object.defineProperty(window, 'freeAccessID', {
            get: () => 999999999999,
            set: () => {},
            configurable: true
        });
    };

    forceFree();

    if (document.readyState === "loading") {
        document.addEventListener('DOMContentLoaded', forceFree);
    }
    window.addEventListener('load', forceFree);

    let attempts = 0;
    const interval = setInterval(() => {
        forceFree();
        attempts++;
        if (attempts > 80) clearInterval(interval);
    }, 50);

    const originalSetTimeout = window.setTimeout;
    window.setTimeout = function(fn, delay) {
        if (typeof fn === 'function') {
            const wrapped = function(...args) {
                forceFree();
                return fn(...args);
            };
            return originalSetTimeout(wrapped, delay);
        }
        return originalSetTimeout(fn, delay);
    };
})();
