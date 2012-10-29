basePath = '../';

files = [
    JASMINE,
    JASMINE_ADAPTER,
//     'test/lib/require/adapter_first.js',
// //    'app/lib/require/require.js',
//     // require.js itself
//     'test/lib/require/adapter_before.js',
//     'app/lib/require/require.js',
// //    'test/lib/require/adapter_after.js',


//     'app/lib/angular/angular.js',
//     'app/lib/angular/angular-*.js',
//     'test/lib/angular/angular-mocks.js',
// //    'app/js/main.js',
//     'app/js/controllers/**.*.js',
//     'app/js/directives/**.*.js',
//     'app/js/filters/**.*.js',
//     'app/js/services/**.*.js',
// //    'test/unit/main.js',
// //    'test/unit/**/*.js',
//     'test/unit/controllersSpec.js'
    'test/vendor/jquery.js',
    'test/vendor/underscore.js',
    'test/vendor/backbone.js',
    'backbone-deferred.js',

    'test/jasmine/**/*.test.js'


];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
    outputFile:'test_out/unit.xml',
    suite:'unit'
};
