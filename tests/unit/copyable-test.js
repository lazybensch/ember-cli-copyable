import Ember from 'ember';
import Copyable from 'ember-cli-copyable';
import DS from 'ember-data';
import { test } from 'ember-qunit';
import { module } from 'qunit';
import startApp from '../helpers/start-app';

var store;
var app;
var foo1, foo2, foo3, bar, baz;

var setupModels = function(async){

  app.Foo = DS.Model.extend( Copyable, {
    prop: DS.attr('string')
  });

  app.Bar = DS.Model.extend( Copyable, {
    foo: DS.belongsTo('foo', { async: async })
  });

  app.Baz = DS.Model.extend( Copyable, {
    foos: DS.hasMany('foo', { async: async })
  });

  app.MultiBar = DS.Model.extend( Copyable, {
    bars: DS.hasMany('bar', { async: async }),
  });

  app.MultiBaz = DS.Model.extend( Copyable, {
    baz: DS.belongsTo('baz', { async: async })
  });

  app.MultiBarBaz = DS.Model.extend( Copyable, {
    baz: DS.belongsTo('baz', { async: async }),
    bars: DS.hasMany('bar', { async: async })
  });

};

var setupRelations = function(){
  Ember.run(function() {

    var createFoo = function(index) {
      return store.createRecord('foo', {
        id: index,
        prop: 'prop' + index
      });
    };

    foo1 = createFoo(1);
    foo2 = createFoo(2);
    foo3 = createFoo(3);

    bar = store.createRecord('bar', {
      id: 1,
      foo: foo1
    });

    baz = store.createRecord('baz', {
      id: 1,
    });

    baz.get('foos').pushObjects([foo2,foo3]);

  });
};

module('copyable - synchronous shallow relations', {
  beforeEach: function() {
    app = startApp();
    store = app.__container__.lookup('store:main');

    setupModels(false);

    app.Foo = DS.Model.extend( {
      prop: DS.attr('string')
    });

    setupRelations();
  }
});

test('it shallow copies belongsTo relations', function(assert) {
  assert.expect(1);
  Ember.run(function() {

    bar.copy().then(function(copy) {

      assert.equal(copy.get('foo.id'), bar.get('foo.id'), 'relation on copy and original is the same object');

    });

  });
});

test('it shallow copies hasMany relations', function(assert) {
  assert.expect(2);
  Ember.run(function() {

    baz.copy().then(function(copy) {

      assert.equal(copy.get('foos.firstObject.id'), baz.get('foos.firstObject.id'), 'first object in hasMany relation on copy and original is the same object');
      assert.equal(copy.get('foos.lastObject.id'), baz.get('foos.lastObject.id'), 'last object in hasMany relation on copy and original is the same object');

    });

  });
});

module('copyable - synchronous deep relations', {
  beforeEach: function() {

    app = startApp();
    store = app.__container__.lookup('store:main');

    setupModels(false);
    setupRelations();

  }
});

test('it copies attributes', function(assert) {
  assert.expect(2);
  Ember.run(function() {

    foo1.copy().then(function(copy) {

      assert.notEqual(copy.get('id'), foo1.get('id'), 'the copy and original are not the same object');
      assert.equal(copy.get('prop'), foo1.get('prop'), 'the attribute properties are the same');

    });

  });
});

test('it deep copies belongsTo relations', function(assert) {
  assert.expect(2);
  Ember.run(function() {

    bar.copy().then(function(copy) {

      assert.notEqual(copy.get('foo.id'), bar.get('foo.id'), 'the relation of copy and original are not the same object');
      assert.equal(copy.get('foo.prop'), bar.get('foo.prop'), 'the relation atrtibute of copy and original are the same');

    });

  });
});

test('it deep copies hasMany relations', function(assert) {
  assert.expect(4);
  Ember.run(function() {

    baz.copy().then(function(copy) {

      assert.notEqual(copy.get('foos.firstObject.id'), baz.get('foos.firstObject.id'), 'the first object in the hasMany relation of copy and original are not the same object');
      assert.equal(copy.get('foos.firstObject.prop'), baz.get('foos.firstObject.prop'), 'the first objects attribute in the hasMany relation of copy and original are the same');
      assert.notEqual(copy.get('foos.lastObject.id'), baz.get('foos.lastObject.id'), 'the last object in the hasMany relation of copy and original are not the same object');
      assert.equal(copy.get('foos.lastObject.prop'), baz.get('foos.lastObject.prop'), 'the first objects attribute in the hasMany relation of copy and original are the same');

    });

  });
});

test('it deep copies through multiple belongsTo/hasMany relations', function(assert) {
  assert.expect(4);
  Ember.run(function() {

    var multi = store.createRecord('multiBaz');
    multi.set('baz', baz);
    multi.set('id', 1);

    multi.copy().then(function(copy) {

      assert.notEqual(copy.get('id'), multi.get('id'), 'the copy and the original are not the same objects');
      assert.notEqual(copy.get('baz.id'), multi.get('baz.id'), 'the copys and originals belongsTo relation are not the same objects');
      assert.notEqual(copy.get('baz.foos.firstObject.id'), multi.get('baz.foos.firstObject.id'), 'the copys and originals hasMany relations are not the same objects');
      assert.equal(copy.get('baz.foos.firstObject.prop'), multi.get('baz.foos.firstObject.prop'), 'the attributes of deeply copied objects are the same');

    });

  });
});

test('it deep copies through multiple hasMany/belongsTo relations', function(assert) {
  assert.expect(4);
  Ember.run(function() {

    var multi = store.createRecord('multiBar');
    multi.get('bars').pushObject(bar);
    multi.set('id', 1);

    multi.copy().then(function(copy) {

      assert.notEqual(copy.get('id'), multi.get('id'), 'the copy and the original are not the same objects');
      assert.notEqual(copy.get('bars.firstObject.id'), multi.get('bars.firstObject.id'), 'the hasMany relations of copy and original are not the same objects');
      assert.notEqual(copy.get('bars.firstObject.foo.id'), multi.get('bars.firstObject.foo.id'), 'the nested relations in hasMany relations of copy and original are not the same objects');
      assert.equal(copy.get('bars.firstObject.foo.prop'), multi.get('bars.firstObject.foo.prop'), 'the nested relations in hasMany relations of copy and original have the same attributes');

    });

  });
});

test('it deep copies through every relation combination', function(assert) {
  assert.expect(7);
  Ember.run(function() {

    var multi = store.createRecord('multiBarBaz');
    multi.get('bars').pushObject(bar);
    multi.set('baz', baz);
    multi.set('id', 1);

    multi.copy().then(function(copy) {

      assert.notEqual(copy.get('id'), multi.get('id'), 'the copy and the original are not the same objects');

      assert.notEqual(copy.get('baz.id'), multi.get('baz.id'), 'the copys and originals belongsTo relation are not the same objects');
      assert.notEqual(copy.get('baz.foos.firstObject.id'), multi.get('baz.foos.firstObject.id'), 'the copys and originals hasMany relations are not the same objects');
      assert.equal(copy.get('baz.foos.firstObject.prop'), multi.get('baz.foos.firstObject.prop'), 'the attributes of deeply copied objects are the same');

      assert.notEqual(copy.get('bars.firstObject.id'), multi.get('bars.firstObject.id'), 'the hasMany relations of copy and original are not the same objects');
      assert.notEqual(copy.get('bars.firstObject.foo.id'), multi.get('bars.firstObject.foo.id'), 'the nested relations in hasMany relations of copy and original are not the same objects');
      assert.equal(copy.get('bars.firstObject.foo.prop'), multi.get('bars.firstObject.foo.prop'), 'the nested relations in hasMany relations of copy and original have the same attributes');

    });

  });
});

test('it works with empty relations', function(assert) {
  assert.expect(3);
  Ember.run(function() {

    var multi = store.createRecord('multiBarBaz');
    multi.set('id', 1);

    multi.copy().then(function(copy) {

      assert.notEqual(copy.get('id'), multi.get('id'), 'the copy and the original are not the same objects');
      assert.equal(copy.get('baz'), null, 'the copy should aswell have no belongsTo relation set');
      assert.equal(copy.get('bars.length'), 0, 'the copy should aswell have no hasMany relation set');

    });

  });
});
