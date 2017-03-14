var Mock = require(process.cwd() + '/index.js');
var expect = require('expect.js');

describe('Mock', function() {
  beforeEach(function() {
    this.testObject = {
      a: 'b',
      c: 'd',
      e: 'f'
    };

    this.mock = new Mock();
  });
  describe('override(name, object, properties)', function() {
    it('replaces the properties in the object', function() {
      this.mock.override('test', this.testObject, {
        a: 1,
        c: 2
      });

      expect(this.testObject).to.eql({
        a: 1,
        c: 2,
        e: 'f'
      });
    });
  });

  describe('restore(object, propertiesArray)', function() {
    it('restores all overriden properties', function() {
      this.mock.override('test', this.testObject, {
        a: 1,
        c: 2
      });

      this.mock.restore('test');

      expect(this.testObject).to.eql({
        a: 'b',
        c: 'd',
        e: 'f'
      });
    });
  });

  describe('restoreAll()', function() {
    it('restores all properties of all objects', function() {
      var to1 = {
        a: 1,
        b: 2
      };

      var to2 = {
        x: 1,
        y: 2
      };

      this.mock.override('to1', to1, {
        a: 'a',
        b: 'b'
      });

      this.mock.override('to2', to2, {
        x: 'a',
        y: 'b'
      });

      this.mock.restoreAll();

      expect(to1).to.eql({
        a: 1,
        b: 2
      });

      expect(to2).to.eql({
        x: 1,
        y: 2
      });
    });
  });
});
