import Ember from 'ember';
import Copyable from 'ember-cli-copy';
import DS from 'ember-data';
import { test } from 'ember-qunit';
import { module } from 'qunit';
import startApp from '../helpers/start-app';

var store;
var app;

module('copyable', {
  beforeEach: function() {

    app = startApp();

    app.Foo = DS.Model.extend( Copyable, {
      prop1: DS.attr('string'),
      prop2: DS.attr('string')
    });

    app.Bar = DS.Model.extend( Copyable, {
      foo: DS.belongsTo('foo'),
    });

    app.Baz = DS.Model.extend( Copyable, {
      foos: DS.hasMany('foo'),
    });

    store = app.__container__.lookup('store:main');
  }
});

test('it copies attributes', function(assert) {
  assert.expect(2);

  Ember.run(function() {

    var foo = store.createRecord('foo', {
      prop1: 'prop1',
      prop2: 'prop2'
    });

    foo.copy().then(function(copy) {

      assert.equal(copy.get('prop1'), foo.get('prop1'));
      assert.equal(copy.get('prop2'), foo.get('prop2'));
    });
  });
});

test('it shallow copies belongsTo relations', function(assert) {
  assert.expect(1);

  Ember.run(function() {

    var foo = store.createRecord('foo', {
      prop1: 'prop1',
      prop2: 'prop2'
    });

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
    foo1.set('id', 1);
    var foo2 = store.createRecord('foo');
    foo2.set('id', 2);

    var baz = store.createRecord('baz');
    baz.get('foos').pushObjects([foo1,foo2]);

    baz.copy().then(function(copy) {
      assert.equal(copy.get('foos.firstObject.id'), baz.get('foos.firstObject.id'));
      assert.equal(copy.get('foos.lastObject.id'), baz.get('foos.lastObject.id'));
    });
  });
});

