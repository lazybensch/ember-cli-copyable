import Ember from 'ember';
import Copyable from 'ember-cli-copyable';
import DS from 'ember-data';
import { test } from 'ember-qunit';
import { module } from 'qunit';
import startApp from '../helpers/start-app';

var store;

var fabricate = function(app, async) {
  app.Foo = DS.Model.extend( Copyable, {
    property: DS.attr('string')
  });

  app.Bar = DS.Model.extend( Copyable, {
    foo: DS.belongsTo('foo', { async: async })
  });

  app.Baz = DS.Model.extend( Copyable, {
    foos: DS.hasMany('foo', {async: async })
  });

  app.Multi = DS.Model.extend( Copyable, {
    bars: DS.hasMany('bar', {async: async }),
    baz: DS.belongsTo('baz', {async: async })
  });

  app.FooFix = DS.Model.extend( {
    property: DS.attr('string')
  });

  app.FooBar = DS.Model.extend( Copyable, {
    fooFix: DS.belongsTo('fooFix', { async: async })
  });

  app.Foo.reopenClass({
    FIXTURES: [
      {
        'id': '1',
        'property': 'prop1'
      },
      {
        'id': '2',
        'property': 'prop2'
      },
      {
        'id': '3',
        'property': 'prop3'
      }
    ]
  });

  app.Bar.reopenClass({
    FIXTURES: [
      {
        'id': '1',
        'foo': '1'
      }
    ]
  });

  app.Baz.reopenClass({
    FIXTURES: [
      {
        'id': '1',
        'foos': ['1', '2']
      }
    ]
  });

  app.Multi.reopenClass({
    FIXTURES: [
      {
        'id': '1',
        'bars': ['1'],
        'baz': '1'
      }
    ]
  });

  app.FooFix.reopenClass({
    FIXTURES: [
      {
        'id': '1',
        'property': 'fix1'
      }
    ]
  });

  app.FooBar.reopenClass({
    FIXTURES: [
      {
        'id': '1',
        'fooFix': '1'
      }
    ]
  });

  app.ApplicationAdapter = DS.FixtureAdapter;
  store = app.__container__.lookup('store:main');
};

module('async copying', {
  beforeEach: function() {
    fabricate(startApp(), true);
  }
});

test('it shallow copies relation', function(assert) {
  assert.expect(1);

  return Ember.run(function() {
    return store.find('fooBar', '1').then( function(fooBar) {

      return fooBar.copy().then(function (copy) {
        assert.equal(copy.get('fooFix.id'), '1');
      });
    });
  });
});

test('it copies belongsTo relation', function(assert) {
  assert.expect(2);

  return Ember.run(function() {
    return store.find('bar', '1').then( function(bar) {

      return bar.copy().then(function (copy) {
        assert.notEqual(copy.get('foo.id'), bar.get('foo.id'));
        assert.equal(copy.get('foo.property'), 'prop1');
      });
    });
  });
});

test('it copies hasMany relation', function(assert) {
  assert.expect(5);

  return Ember.run(function() {
    return store.find('baz', '1').then( function(baz) {

      return baz.copy().then(function (copy) {
        assert.equal(copy.get('foos.length'), 2);
        assert.notEqual(copy.get('foos.firstObject.id'), '1');
        assert.notEqual(copy.get('foos.lastObject.id'), '2');
        assert.equal(copy.get('foos.firstObject.property'), 'prop1');
        assert.equal(copy.get('foos.lastObject.property'), 'prop2');
      });
    });
  });
});

test('it copies complex objects', function(assert) {
  assert.expect(6);

  return Ember.run(function() {
    return store.find('multi', '1').then( function(multi) {

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
});

module('sync copying', {
  beforeEach: function() {
    fabricate(startApp(), false);

    return Ember.RSVP.all(['foo','bar','baz','multi','fooBar','fooFix'].map(function(type) {
      return store.find(type);
    }));
  }
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
