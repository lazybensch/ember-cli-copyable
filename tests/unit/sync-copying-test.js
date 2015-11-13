import Ember from 'ember';
import { test } from 'ember-qunit';
import { module } from 'qunit';
import startApp from '../helpers/start-app';
import fabricate from '../helpers/fabricate';

var store;

module('sync copying', {
  beforeEach: function() {
    store = fabricate(startApp(), false);

    return Ember.RSVP.all(['foo','bar','baz','multi','fooBar','fooFix', 'FooEmpty'].map(function(type) {
      return store.find(type);
    }));
  }
});

test('it excludes attributes', function(assert) {
  assert.expect(1);

  var foo = store.getById('foo', '1');
  return Ember.run(function() {
    return foo.copy({property: null}).then(function (copy) {
      assert.equal(copy.get('property'), null);
    });
  });
});

test('copies to', function(assert) {
  assert.expect(2);

  var foo = store.getById('foo', '1');
  return Ember.run(function() {
    assert.equal(foo.get('property'), 'prop1');
    var copy = store.createRecord('foo');
    return foo.copyTo(copy).then(function () {
      assert.equal(copy.get('property'), 'prop1');
    });
  });
});

test('it shallow copies relation', function(assert) {
  assert.expect(1);

  var fooBar = store.getById('fooBar', '1');
  return Ember.run(function() {
    return fooBar.copy().then(function (copy) {
      assert.equal(copy.get('fooFix.id'), '1');
    });
  });
});

test('it copies belongsTo relation', function(assert) {
  assert.expect(2);

  var bar = store.getById('bar', '1');
  return Ember.run(function() {
    return bar.copy().then(function (copy) {
      assert.notEqual(copy.get('foo.id'), bar.get('foo.id'));
      assert.equal(copy.get('foo.property'), 'prop1');
    });
  });
});

test('it copies with empty belongsTo relation', function(assert) {
  assert.expect(2);

  var fooEmpty = store.getById('fooEmpty', '1');
  return Ember.run(function() {
    return fooEmpty.copy().then(function (copy) {
      assert.equal(copy.get('property'), fooEmpty.get('property'));
      assert.equal(copy.get('foo'), null);
    });
  });
});

test('it copies hasMany relation', function(assert) {
  assert.expect(5);

  var baz = store.getById('baz', '1');
  return Ember.run(function() {
    return baz.copy().then(function (copy) {
      assert.equal(copy.get('foos.length'), 2);
      assert.notEqual(copy.get('foos.firstObject.id'), '1');
      assert.notEqual(copy.get('foos.lastObject.id'), '2');
      assert.equal(copy.get('foos.firstObject.property'), 'prop1');
      assert.equal(copy.get('foos.lastObject.property'), 'prop2');
    });
  });
});

test('it copies complex objects', function(assert) {
  assert.expect(6);

  var multi = store.getById('multi', '1');
  return Ember.run(function() {
    return multi.copy().then(function (copy) {
      assert.notEqual(copy.get('bars.firstObject.id'), '1');
      assert.notEqual(copy.get('bars.firstObject.foo.id'), '1');
      assert.equal(copy.get('bars.firstObject.foo.property'), 'prop1');
      assert.notEqual(copy.get('baz.id'), '1');
      assert.notEqual(copy.get('baz.foos.lastObject.id'), '2');
      assert.equal(copy.get('baz.foos.lastObject.property'), 'prop2');
    });
  });
});

test('it overwrites relations', function(assert) {
  assert.expect(2);

  var multi = store.getById('multi', '1');
  var myBaz = store.getById('baz', '2');
  return Ember.run(function() {
    return multi.copy({baz: myBaz, bars: []}).then(function (copy) {
      assert.equal(copy.get('bars.length'), 0);
      assert.equal(copy.get('baz.foos.length'), myBaz.get('foos.length'));
    });
  });
});

test('it excludes relations', function(assert) {
  assert.expect(2);

  var multi = store.getById('multi', '1');
  return Ember.run(function() {
    return multi.copy({baz: null}).then(function (copy) {
      assert.equal(copy.get('bars.firstObject.foo.property'), 'prop1');
      assert.equal(copy.get('baz'), null);
    });
  });
});

test('it copies empty objects', function(assert) {
  assert.expect(3);

  var multi = store.getById('multi', '2');
  return Ember.run(function() {
    return multi.copy().then(function (copy) {
      assert.notEqual(copy.get('id'), '2');
      assert.equal(copy.get('bars.length'), 0);
      assert.equal(copy.get('baz.foos.firstObject.property'), 'prop1');
    });
  });
});
