import { moduleForModel, test } from 'ember-qunit';

let subject, copy;
moduleForModel('option', 'Mixin | Copyable | Options', {
  needs: ['model:shallow', 'model:deep'],
  beforeEach() {
    subject = this.subject({
      str: 'foo',
      strFn: 'bar',
      strAttr: 'baz',
      strPr: 'bang',
      num: 1,
      numFn: 2,
      numPr: 2,
      numAttr: 3,
      bool: true,
      boolFn: false,
      boolPr: false,
      boolAttr: true,
      raw: [1, 2, 'a', 'b', { x: 'y' }],
      rawFn: [1, 2, 'a', 'b', { x: 'y' }],
      rawPr: [],
      rawAttr: [1, 2, 'a', 'b', { x: 'y' }],
      shallow: this.store().createRecord('shallow', { str: 'foo' }),
      shallowFn: this.store().createRecord('shallow', { str: 'foo' }),
      shallowPr: this.store().createRecord('shallow', { str: 'foo' }),
      shallowAttr: this.store().createRecord('shallow', { str: 'foo' }),
      deep: this.store().createRecord('deep', { str: 'foo' }),
      deepFn: this.store().createRecord('deep', { str: 'foo' }),
      deepPr: this.store().createRecord('deep', { str: 'foo' }),
      deepAttr: this.store().createRecord('deep', { str: 'foo' }),
      shallowSync: this.store().createRecord('shallow', { str: 'foo' }),
      shallowFnSync: this.store().createRecord('shallow', { str: 'foo' }),
      shallowPrSync: this.store().createRecord('shallow', { str: 'foo' }),
      shallowAttrSync: this.store().createRecord('shallow', { str: 'foo' }),
      deepSync: this.store().createRecord('deep', { str: 'foo' }),
      deepFnSync: this.store().createRecord('deep', { str: 'foo' }),
      deepPrSync: this.store().createRecord('deep', { str: 'foo' }),
      deepAttrSync: this.store().createRecord('deep', { str: 'foo' }),

      shallows: [ this.store().createRecord('shallow', { str: 'foo' }), ],
      shallowsFn: [ this.store().createRecord('shallow', { str: 'foo' }), ],
      shallowsPr: [ this.store().createRecord('shallow', { str: 'foo' }), ],
      shallowsAttr: [ this.store().createRecord('shallow', { str: 'foo' }), ],
      deeps: [ this.store().createRecord('deep', { str: 'foo' }), ],
      deepsFn: [ this.store().createRecord('deep', { str: 'foo' }), ],
      deepsPr: [ this.store().createRecord('deep', { str: 'foo' }), ],
      deepsAttr: [ this.store().createRecord('deep', { str: 'foo' }), ],
      shallowsSync: [ this.store().createRecord('shallow', { str: 'foo' }), ],
      shallowsFnSync: [ this.store().createRecord('shallow', { str: 'foo' }), ],
      shallowsPrSync: [ this.store().createRecord('shallow', { str: 'foo' }), ],
      shallowsAttrSync: [ this.store().createRecord('shallow', { str: 'foo' }), ],
      deepsSync: [ this.store().createRecord('deep', { str: 'foo' }), ],
      deepsFnSync: [ this.store().createRecord('deep', { str: 'foo' }), ],
      deepsPrSync: [ this.store().createRecord('deep', { str: 'foo' }), ],
      deepsAttrSync: [ this.store().createRecord('deep', { str: 'foo' }), ],
    });

    copy = subject.copy();
  }
});

test('copies strings with custom copy option', function(assert) {
  assert.equal(copy.get('str'), 'foo', 'with no option');
  assert.equal(copy.get('strFn'), 'barbarbar (copy)', 'with function');
  assert.equal(copy.get('strPr'), 'bang (promise-copy)', 'with promise');
  assert.equal(copy.get('strAttr'), 'blub', 'with attribute');
});

test('copies number with custom copy option', function(assert) {
  assert.equal(copy.get('num'), 1, 'with no option');
  assert.equal(copy.get('numFn'), 2+2+2, 'with function');
  assert.equal(copy.get('numPr'), 2*2, 'with promise');
  assert.equal(copy.get('numAttr'), 0, 'with attribute');
});

test('copies boolean with custom copy option', function(assert) {
  assert.equal(copy.get('bool'), true, 'with no option');
  assert.equal(copy.get('boolFn'), true, 'with function');
  assert.equal(copy.get('boolPr'), true, 'with promise');
  assert.equal(copy.get('boolAttr'), false, 'with attribute');
});

test('copies raw property with custom copy option', function(assert) {
  assert.deepEqual(copy.get('raw'), [1, 2, 'a', 'b', { x: 'y' }], 'with no option');
  assert.deepEqual(copy.get('rawFn'), [{ x: 'y' }, { x: 'y' }, { x: 'y' }], 'with function');
  assert.deepEqual(copy.get('rawPr'), {}, 'with promise');
  assert.deepEqual(copy.get('rawAttr'), { a: 1 }, 'with attribute');
});

[
  { rel: 'shallow', compare: 'equal' },
  { rel: 'deep', compare: 'notEqual' }
].forEach(({ rel, compare }) => {
  [ '.content', 'Sync'].forEach(m => {
    test(`copies ${rel}${m} belongsTo with custom copy option`, function(assert) {
      assert[compare](copy.get(`${rel}${m}`), subject.get(`${rel}${m}`), 'with no option');
      assert.equal(copy.get(`${rel}Fn.str`), 'foo copy', 'with function');
      assert.notEqual(copy.get(`${rel}Fn${m}`), subject.get(`${rel}${m}`), 'with function');
      assert.equal(copy.get(`${rel}Pr${m}`), subject.get(`${rel}Pr${m}`), 'with promise');
      assert.equal(copy.get(`${rel}Attr${m}`), null, 'with attribute');
    });

    test(`copies ${rel}${m} hasMany with custom copy option`, function(assert) {
      assert[compare](copy.get(`${rel}s${m}.firstObject`), subject.get(`${rel}s${m}.firstObject`), 'with no option');
      assert.equal(copy.get(`${rel}sFn${m}.firstObject.str`), 'foo copy', 'with function');
      assert.notEqual(copy.get(`${rel}sFn${m}.firstObject`), subject.get(`${rel}s${m}.firstObject`), 'with function');
      assert.equal(copy.get(`${rel}sPr${m}.firstObject`), subject.get(`${rel}sPr${m}.firstObject`), 'with promise');
      assert.equal(copy.get(`${rel}sAttr${m}.firstObject`), null, 'with attribute');
    });
  });
});
