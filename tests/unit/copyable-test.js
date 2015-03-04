import Ember from 'ember';
import Copyable from 'ember-cli-copy';
import DS from 'ember-data';
import { test } from 'ember-qunit';
import { module } from 'qunit';
import startApp from '../helpers/start-app';

var store;
var app;

module('copyable - synchronous relations', {
  beforeEach: function() {

    app = startApp();

    app.Foo = DS.Model.extend( {
      prop1: DS.attr('string'),
      prop2: DS.attr('string')
    });

    app.Bar = DS.Model.extend( Copyable, {
      foo: DS.belongsTo('foo'),
    });

    app.Fee = DS.Model.extend( Copyable, {
      prop1: DS.attr('string'),
      prop2: DS.attr('string')
    });

    app.Ber = DS.Model.extend( Copyable, {
      fee: DS.belongsTo('fee'),
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

    var fee = store.createRecord('fee', {
      prop1: 'prop1',
      prop2: 'prop2'
    });

    fee.copy().then(function(copy) {

      assert.equal(copy.get('prop1'), fee.get('prop1'));
      assert.equal(copy.get('prop2'), fee.get('prop2'));
    });
  });
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

test('it deep copies belongsTo relations', function(assert) {
  assert.expect(2);

  Ember.run(function() {

    var fee = store.createRecord('fee');
    fee.set('prop1', 'prop1');
    fee.set('id', 1);

    var ber = store.createRecord('ber', {
      fee: fee
    });

    ber.copy().then(function(copy) {
      assert.notEqual(copy.get('fee.id'), ber.get('fee.id'));
      assert.equal(copy.get('fee.prop1'), ber.get('fee.prop1'));
    });
  });
});

