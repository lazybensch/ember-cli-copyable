import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';
const { run } = Ember;

let subject, copy;
moduleForModel('foo', 'copy on Foo', {
  needs: ['model:bar', 'model:boo'],
  beforeEach(assert) {
    const done = assert.async();
    const store = this.store();
    subject = this.subject({
      str: 'asdf',
      num: 3,
      raw: [1,2, new Date(), { a: 'b' }],
      bool: true,

      bar: store.createRecord('bar'),
      boos: [
        store.createRecord('boo'),
        store.createRecord('boo'),
        store.createRecord('boo')
      ]
    });

    run(() => {
      copy = subject.copy();
      done();
    });
  }
});

test('it exists', function(assert) {
  assert.equal(typeof subject.copy, 'function');
});

test('it returns an Object of same Class', function(assert) {
  assert.equal(copy.get('constructor'), subject.get('constructor'));
});

test('it shallow copies attributes', function(assert) {
  assert.equal(copy.get('str'), subject.get('str'), 'of type String');
  assert.equal(copy.get('num'), subject.get('num'), 'of type Number');
  assert.equal(copy.get('raw'), subject.get('raw'), 'of type Raw');
  assert.equal(copy.get('bool'), subject.get('bool'), 'of type Boolean');
});

test('it shallow copies relationships', function(assert) {
  assert.equal(copy.get('bar'), subject.get('bar'), 'of type belongsTo');
  subject.get('boos').forEach((boo, index) => {
    assert.equal(copy.get('boos').objectAt(index), boo, 'of type HasMany');
  });
});
