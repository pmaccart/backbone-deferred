# backbone-deferred

Invoke jQuery Deferred callbacks with Backbone Model/Collection as first parameter.

## Getting Started
### On the server
Install the module with: `npm install backbone-deferred`

```javascript
var backbone_deferred = require('backbone-deferred');
var MyCollection = Backbone.Collection.extend({
    url:"/path/to/data"
});

var deferred = new MyCollection().fetch();
deferred.done(function(collection) {
    // use the collection;
});
```

### In the browser
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/pmaccart/backbone-deferred/master/dist/backbone-deferred.min.js
[max]: https://raw.github.com/pmaccart/backbone-deferred/master/dist/backbone-deferred.js

In your web page:

```html
<script src="backbone.js"></script>
<script src="backbone-deferred.min.js"></script>
<script>
    var MyCollection = Backbone.Collection.extend({
        url:"/path/to/data"
    });

    var deferred = new MyCollection().fetch();
    deferred.done(function(collection) {
        // use the collection;
    });
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](http://gruntjs.com/).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "lib" subdirectory!_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 pmaccart  
Licensed under the MIT license.
