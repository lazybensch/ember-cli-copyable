import Ember from 'ember';
import Copyable from 'ember-cli-copyable';
import DS from 'ember-data';
import { test } from 'ember-qunit';
import { module } from 'qunit';
import startApp from '../helpers/start-app';

var App, store;
var bla;
module('sync test', {

  beforeEach: function() {

    App = startApp();

    App.Foo = DS.Model.extend( Copyable, {
      property: DS.attr('string')
    });

    App.Bar = DS.Model.extend( Copyable, {
      foo: DS.belongsTo('foo', { async: true })
    });

    App.Baz = DS.Model.extend( Copyable, {
      foos: DS.hasMany('foo', {async: true })
    });

    App.Multi = DS.Model.extend( Copyable, {
      bars: DS.hasMany('bar', {async: true }),
      baz: DS.belongsTo('baz', {async: true })
    });

    App.Foo.reopenClass({
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

    App.Bar.reopenClass({
      FIXTURES: [
        {
          'id': '1',
          'foo': '1'
        }
      ]
    });

    App.Baz.reopenClass({
      FIXTURES: [
        {
          'id': '1',
          'foos': ['1', '2']
        }
      ]
    });

    App.Multi.reopenClass({
      FIXTURES: [
        {
          'id': '1',
          'bars': ['1'],
          'baz': '1'
        }
      ]
    });

    App.ApplicationAdapter = DS.FixtureAdapter;
    store = App.__container__.lookup('store:main');

  }

});


test('it copies belongsTo relation', function(assert) {
  assert.expect(2);

  return Ember.run(function() {
    return store.find('bar', '1').then( function(bar) {

      return bar.copy().then(function (copy) {
        assert.notEqual(copy.get('foo.id'), bar.get('foo.id'), 'copy.relation is a different object');
        assert.equal(copy.get('foo.property'), 'prop1', 'attributes are the same');
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
