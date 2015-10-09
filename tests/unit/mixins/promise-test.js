import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';
const { run } = Ember;

let subject, copy;
moduleForModel('base', 'Mixin | Copyable | Base', {
  needs: ['model:shallow', 'model:deep'],
  beforeEach() {
    subject = this.subject({
      str: 'base-string',
      shallow: this.store().createRecord('shallow'),
      shallowSync: this.store().createRecord('shallow'),
      shallows: [
        this.store().createRecord('shallow'),
        this.store().createRecord('shallow')
      ],
      shallowsSync: [
        this.store().createRecord('shallow'),
        this.store().createRecord('shallow')
      ],
      deep: this.store().createRecord('deep'),
      deepSync: this.store().createRecord('deep'),
      deeps: [
        this.store().createRecord('deep'),
        this.store().createRecord('deep')
      ],
      deepsSync: [
        this.store().createRecord('deep'),
        this.store().createRecord('deep')
      ]
    });

    copy = subject.copy();
  }
});

test('it exists', function(assert) {
  assert.equal(copy.get('content.constructor.modelName'), subject.get('constructor.modelName'));

  assert.equal(copy.get('shallow.content.constructor.modelName'), 'shallow');
  assert.equal(copy.get('shallow.content'), subject.get('shallow.content'));

  assert.equal(copy.get('shallowSync.constructor.modelName'), 'shallow');
  assert.equal(copy.get('shallowSync'), subject.get('shallowSync'));

  assert.equal(copy.get('shallows.content.firstObject.constructor.modelName'), 'shallow');
  assert.equal(copy.get('shallows.content.firstObject'), subject.get('shallows.content.firstObject'));
  assert.equal(copy.get('shallows.content.lastObject.constructor.modelName'), 'shallow');
  assert.equal(copy.get('shallows.content.lastObject'), subject.get('shallows.content.lastObject'));

  assert.equal(copy.get('shallowsSync.firstObject.constructor.modelName'), 'shallow');
  assert.equal(copy.get('shallowsSync.firstObject'), subject.get('shallowsSync.firstObject'));
  assert.equal(copy.get('shallowsSync.lastObject.constructor.modelName'), 'shallow');
  assert.equal(copy.get('shallowsSync.lastObject'), subject.get('shallowsSync.lastObject'));

  assert.equal(copy.get('deep.content.constructor.modelName'), 'deep');
  assert.notEqual(copy.get('deep.content'), subject.get('deep.content'));

  assert.equal(copy.get('deepSync.constructor.modelName'), 'deep');
  assert.notEqual(copy.get('deepSync'), subject.get('deepSync'));

  assert.equal(copy.get('deeps.content.firstObject.constructor.modelName'), 'deep');
  assert.notEqual(copy.get('deeps.content.firstObject'), subject.get('deeps.content.firstObject'));
  assert.equal(copy.get('deeps.content.lastObject.constructor.modelName'), 'deep');
  assert.notEqual(copy.get('deeps.content.lastObject'), subject.get('deeps.content.lastObject'));

  assert.equal(copy.get('deepsSync.firstObject.constructor.modelName'), 'deep');
  assert.notEqual(copy.get('deepsSync.firstObject'), subject.get('deepsSync.firstObject'));
  assert.equal(copy.get('deepsSync.lastObject.constructor.modelName'), 'deep');
  assert.notEqual(copy.get('deepsSync.lastObject'), subject.get('deepsSync.lastObject'));

  assert.equal(copy.get('str'), 'base-string');

  // console.log(subject.get('shallow.content'));
  // console.log(copy.get('shallow.content'));
});

