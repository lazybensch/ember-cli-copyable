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

    app.Record = DS.Model.extend( Copyable, {
      foo: DS.attr('string'),
      bar: DS.attr('string')
    });

    store = app.__container__.lookup('store:main');
  }
});

test('it copies attributes', function(assert) {
  assert.expect(2);

  Ember.run(function() {

    var ad = store.createRecord('record', {
      foo: 'foo',
      bar: 'bar'
    });

    ad.copy().then(function(copy) {

      assert.equal(copy.get('foo'), ad.get('foo'));
      assert.equal(copy.get('bar'), ad.get('bar'));
    });
  });
});

