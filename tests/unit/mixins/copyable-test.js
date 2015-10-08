import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';
const { run } = Ember;

let subject, copy;
moduleForModel('foo', 'Mixin | Copyable', {
  needs: ['model:bar', 'model:boo'],
  beforeEach(assert) {
    const done = assert.async();
    const store = this.store();
    subject = this.subject({
      str: 'asdf',
      num: 3,
      raw: [1,2, new Date(), { a: 'b' }],
      bool: true,

      strOverwrite: 'asdf',
      numOverwrite: 3,
      rawOverwrite: [1,2, new Date(), { a: 'b' }],
      boolOverwrite: true,

      rawCopyableWithFunction: {
        identifier: 1,
        copy() {
          return 'custom copy';
        }
      },

      rawCopyableWithProperty: {
        identifier: 1,
        copy: 'custom copy'
      },

      strCustomCopy: 'custom',

      bar: store.createRecord('bar'),
      boos: [
        store.createRecord('boo'),
        store.createRecord('boo'),
        store.createRecord('boo')
      ],

      barOverwrite: store.createRecord('bar', { identifier: 1 }),
      boosOverwrite: [
        store.createRecord('boo', { identifier: 0 }),
        store.createRecord('boo', { identifier: 1 }),
        store.createRecord('boo', { identifier: 2 })
      ]
    });

    run(() => {
      copy = subject.copy({
        strOverwrite: 'something else',
        numOverwrite: -1,
        rawOverwrite: null,
        boolOverwrite: false,

        barOverwrite: store.createRecord('bar', { identifier: 2 }),
        boosOverwrite: [
          store.createRecord('boo', { identifier: 0 }),
          store.createRecord('boo', { identifier: 2 }),
          store.createRecord('boo', { identifier: 4 })
        ]
      });
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

test('it overwrites attributes', function(assert) {
  assert.equal(copy.get('strOverwrite'), 'something else', 'of type String');
  assert.equal(copy.get('numOverwrite'), -1, 'of type Number');
  assert.equal(copy.get('rawOverwrite'), null);
  assert.equal(copy.get('boolOverwrite'), false, 'of type Boolean');
});

test('it deeply copies attributes', function(assert) {
  assert.equal(copy.get('rawCopyableWithFunction'), 'custom copy', 'with copy functions');
  assert.equal(copy.get('rawCopyableWithProperty'), 'custom copy', 'with copy properties');
  assert.equal(copy.get('strCustomCopy'), 'custom (copy)', 'with copy options');
});

test('it shallow copies relationships', function(assert) {
  assert.equal(copy.get('bar'), subject.get('bar'), 'of type belongsTo');
  subject.get('boos').forEach((boo, index) => {
    assert.equal(copy.get('boos').objectAt(index), boo, 'of type HasMany');
  });
});

test('it overwrites relationships', function(assert) {
  assert.equal(copy.get('barOverwrite.identifier'), 2, 'of type belongsTo');
  subject.get('boosOverwrite').forEach((boo, index) => {
    const copyBoo = copy.get('boosOverwrite').objectAt(index);
    assert.equal(copyBoo.get('identifier'), 2*index, 'of type HasMany');
  });
});
