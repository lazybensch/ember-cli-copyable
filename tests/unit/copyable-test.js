import Ember from 'ember';
import Copyable from 'ember-cli-copy';
import DS from 'ember-data';
import { test } from 'ember-qunit';
import { module } from 'qunit';
import startApp from '../helpers/start-app';

var store;
var app;

module('copyable - synchronous shallow relations', {
  beforeEach: function() {
    app = startApp();
    store = app.__container__.lookup('store:main');

    app.Foo = DS.Model.extend( {
      prop: DS.attr('string')
    });

    app.Bar = DS.Model.extend( Copyable, {
      foo: DS.belongsTo('foo')
    });

    app.Baz = DS.Model.extend( Copyable, {
      foos: DS.hasMany('foo')
    });
  }
});

test('it shallow copies belongsTo relations', function(assert) {
  assert.expect(1);

  Ember.run(function() {

    var foo = store.createRecord('foo');
    foo.set('id', 1);

    var bar = store.createRecord('bar', {
      foo: foo
    });

    bar.copy().then(function(copy) {
      assert.equal(copy.get('foo.id'), bar.get('foo.id'));
    });
  });
});

test('it shallow copies hasMany relations', function(assert) {
  assert.expect(2);

  Ember.run(function() {

    var foo1 = store.createRecord('foo');
    var foo2 = store.createRecord('foo');
    var baz = store.createRecord('baz');

    foo1.set('id', 1);
    foo2.set('id', 2);
    baz.get('foos').pushObjects([foo1,foo2]);

    baz.copy().then(function(copy) {
      assert.equal(copy.get('foos.firstObject.id'), baz.get('foos.firstObject.id'));
      assert.equal(copy.get('foos.lastObject.id'), baz.get('foos.lastObject.id'));
    });
  });
});

module('copyable - synchronous deep relations', {
  beforeEach: function() {

    app = startApp();

    app.Foo = DS.Model.extend( Copyable, {
      prop: DS.attr('string')
    });

    app.Bar = DS.Model.extend( Copyable, {
      foo: DS.belongsTo('foo')
    });

    app.Baz = DS.Model.extend( Copyable, {
      foos: DS.hasMany('foo')
    });

    store = app.__container__.lookup('store:main');
  }
});

test('it copies attributes', function(assert) {
  assert.expect(2);

  Ember.run(function() {

    var foo = store.createRecord('foo', {
      prop: 'prop',
    });

    foo.set('id', 1);
    foo.copy().then(function(copy) {

      assert.notEqual(copy.get('id'), foo.get('id'));
      assert.equal(copy.get('prop'), foo.get('prop'));
    });
  });
});

test('it deep copies belongsTo relations', function(assert) {
  assert.expect(2);

  Ember.run(function() {

    var foo = store.createRecord('foo');
    foo.set('prop', 'prop');
    foo.set('id', 1);

    var bar = store.createRecord('bar', {
      foo: foo
    });

    bar.copy().then(function(copy) {
      assert.notEqual(copy.get('foo.id'), bar.get('foo.id'));
      assert.equal(copy.get('foo.prop'), bar.get('foo.prop'));
    });
  });
});

test('it deep copies hasMany relations', function(assert) {
  assert.expect(4);

  Ember.run(function() {

    var foo1 = store.createRecord('foo');
    var foo2 = store.createRecord('foo');
    var baz = store.createRecord('baz');

    foo1.set('id', 1);
    foo2.set('id', 2);
    foo1.set('prop', 'prop1');
    foo2.set('prop', 'prop2');
    baz.get('foos').pushObjects([foo1,foo2]);

    baz.copy().then(function(copy) {
      assert.notEqual(copy.get('foos.firstObject.id'), baz.get('foos.firstObject.id'));
      assert.equal(copy.get('foos.firstObject.prop'), baz.get('foos.firstObject.prop'));
      assert.notEqual(copy.get('foos.lastObject.id'), baz.get('foos.lastObject.id'));
      assert.equal(copy.get('foos.lastObject.prop'), baz.get('foos.lastObject.prop'));
    });
  });
});
