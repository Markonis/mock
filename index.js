var _ = require('underscore');
var Bundle = require('@markonis/bundle');

module.exports = (function() {
  var Mock = function() {
    var originals = new Bundle();
    var mocks = new Bundle();

    this.register = function(name, object) {
      var original = _.clone(object);
      originals.addPart(name, 'object', original);
      mocks.addPart(name, 'object', object);
    };

    this.override = function(name, object, properties) {
      this.register(name, object);
      _.extend(object, properties);
    };

    this.restore = function(name, propertiesArray) {
      var original = originals.getPartData(name);
      var mocked = mocks.getPartData(name);

      if (original === null || mocked === null) return;

      var properties = original;
      if (propertiesArray) properties = _.pick(original, propertiesArray);

      _.extend(mocked, properties);
    };

    this.restoreAll = function() {
      var allMocked = mocks.getPartsData('object');
      var allOriginal = originals.getPartsData('object');

      var zipped = _.zip(allMocked, allOriginal);
      _.each(zipped, function(pair) {
        _.extend(pair[0], pair[1]);
      });
    };
  };

  return Mock;
}());
