import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';
const { run } = Ember;

let subject, copy;
moduleForModel('foo', 'Mixin | Copyable', {
  needs: ['model:bar', 'model:faa'],
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
        copy() {
          return 'custom copy';
        }
      },

      rawCopyableWithProperty: {
        copy: 'custom copy'
      },

      strCustomCopy: 'custom',

      bar: store.createRecord('bar'),
      bars: [
        store.createRecord('bar'),
        store.createRecord('bar'),
        store.createRecord('bar')
      ],

      faa: store.createRecord('faa'),
      faas: [
        store.createRecord('faa'),
        store.createRecord('faa'),
        store.createRecord('faa')
      ],


      barOverwrite: store.createRecord('bar'),
      barsOverwrite: [
        store.createRecord('bar'),
        store.createRecord('bar'),
        store.createRecord('bar')
      ]
    });

    run(() => {
      copy = subject.copy({
        strOverwrite: 'something else',
        numOverwrite: -1,
        rawOverwrite: null,
        boolOverwrite: false,

        barOverwrite: store.createRecord('bar', { identifier: 2 }),
        barsOverwrite: [
          store.createRecord('bar', { identifier: 0 }),
          store.createRecord('bar', { identifier: 2 }),
          store.createRecord('bar', { identifier: 4 })
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
  subject.get('bars').forEach((bar, index) => {
    assert.equal(copy.get('bars').objectAt(index), bar, 'of type HasMany');
  });
});

test('it overwrites relationships', function(assert) {
  assert.equal(copy.get('barOverwrite.identifier'), 2, 'of type belongsTo');
  subject.get('barsOverwrite').forEach((bar, index) => {
    const copyBar = copy.get('barsOverwrite').objectAt(index);
    assert.equal(copyBar.get('identifier'), 2*index, 'of type HasMany');
  });
});

test('it deeply copies relationships', function(assert) {
  assert.ok(copy.get('faa'), 'of type belongsTo');
  assert.equal(copy.get('faa.constructor.modelName') , 'faa', 'of type belongsTo');
  assert.notEqual(copy.get('faa'), subject.get('faa'), 'of type belongsTo');
  subject.get('faas').forEach((faa, index) => {
    const copyFaa = copy.get('faas').objectAt(index);
    assert.ok(copyFaa, 'of type hasMany');
    assert.equal(copyFaa.get('constructor.modelName') , 'faa', 'of type hasMany');
    assert.equal(copyFaa, faa, 'of type HasMany');
  });
});
