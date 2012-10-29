describe('Test plugin functionality', function() {

  // execute tests on both Collections and Models
  _.each(['Collection', 'Model'], function(type) {

    // execute tests for all actions on the types
    _.each(['fetch', 'save', 'destoy'], function (action) {
      if (Backbone[type].prototype[action]) {
        describe(type + ' ' + action + ' tests', function() {
        
          beforeEach(function () {
            this[type] = Backbone[type].extend({
              url:'notuse'
            });

            this.jqXhr = $.Deferred();
            spyOn(this.jqXhr, 'pipe').andCallThrough();

            spyOn(Backbone, 'ajax').andReturn(this.jqXhr);
          });

          it('should invoke original sync method on Backbone', function () {
            var obj = new this[type]();
            obj[action]();

            expect(Backbone.ajax).toHaveBeenCalled();

            Backbone.ajax.reset();
          });

          it('should return a jQuery Deferred that invokes resolved callbacks with the Model/Collection', function () {
            var obj = new this[type]();
            if (type !== 'Collection') obj.id = 1;
            var deferred = obj[action]();
            expect(Backbone.ajax).toHaveBeenCalled();

            var doneSpy = jasmine.createSpy(),
              failSpy = jasmine.createSpy(),
              alwaysSpy = jasmine.createSpy();
            deferred.done(doneSpy);
            deferred.fail(failSpy);
            deferred.always(alwaysSpy);

            deferred.resolve();
            _.each([doneSpy, alwaysSpy], function(spy, i) {
              console.log("resolve", i, spy.mostRecentCall.args[0], obj, spy.mostRecentCall.args[0] === obj);
              expect(spy.mostRecentCall.args[0]).toBe(obj);
            });

            expect(failSpy).not.toHaveBeenCalled();
          });

          it('should return a jQuery Deferred that invokes rejected callbacks with the Model/Collection', function () {
            var obj = new this[type]();
            if (type !== 'Collection') obj.id = 1;
            var deferred = obj[action]();
            expect(Backbone.ajax).toHaveBeenCalled();

            var doneSpy = jasmine.createSpy().andCallFake(function() {
              console.log("done spy invoked");
              console.log("done spy args", arguments);
            }),
              failSpy = jasmine.createSpy().andCallFake(function() {
              console.log("fail spy invoked");
              console.log("fail spy args", arguments);
            }),
              alwaysSpy = jasmine.createSpy().andCallFake(function() {
              console.log("always spy invoked");
              console.log("always spy args", arguments);
            });
            deferred.done(doneSpy);
            deferred.fail(failSpy);
            deferred.always(alwaysSpy);

            deferred.reject();
            _.each([failSpy, alwaysSpy], function(spy, i) {
              console.log("reject", i, spy.mostRecentCall.args[0], obj, spy.mostRecentCall.args[0] === obj);
              expect(spy.mostRecentCall.args[0]).toBe(obj);
            });

            expect(doneSpy).not.toHaveBeenCalled();
          });

        });  
      } // end if
      
    });
  });
});