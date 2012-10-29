/*
 * backbone-deferred
 * https://github.com/pmaccart/backbone-deferred
 *
 * Copyright (c) 2012 pmaccart
 * Licensed under the MIT license.
 */

(function(exports) {

    'use strict';

    // cache library references
    var Backbone = exports.Backbone,
        $ = exports.$;

    // cache the original sync method
    var _sync = Backbone.sync;

    var getFilter = function (backboneObj, method) {
        // create a filter function that will produce a jQuery.Deferred to 
        // be either resolved or rejected
        return function() {
            // create array with the Backbone object as the first entry
            var cbArgs = [backboneObj];

            // append all arguments the callback was invoked with to the array
            cbArgs.push.apply(cbArgs, arguments);

            // create a new $.Deferred that is immediately resolved with 
            // the modified arguments
            var deferred = $.Deferred();
            return deferred[method].apply(deferred, cbArgs); 
        };
    };

    // override sync to return a new $.Deferred
    Backbone.sync = function () {

        // invoke the cached sync method
        var jqXhr = _sync.apply(this, arguments);

        // create reference to the current Backbone object being operated on
        var self = this;

        // retrieve a filter for both the success and error cases
        var deferred = jqXhr.pipe(getFilter(this, 'resolve'), getFilter(this, 'reject'));

        // replace the $.Deferred returned from Backbone.sync with a modifed instance
        return $.extend(true, jqXhr, deferred);
    }

}(typeof exports === 'object' && exports || this));
