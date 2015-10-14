import { moduleForModel, test } from 'ember-qunit';

let subject, copy;
moduleForModel('inline', 'Mixin | Copyable | Inline Options', {
  needs: ['model:shallow', 'model:deep'],
  beforeEach() {
    subject = this.subject({
      str: 'foo',
      shallow: this.store().createRecord('shallow', { str: 'baz' }),
      deep: this.store().createRecord('deep', {
        shallow: this.store().createRecord('shallow', { str: 'shallow in deep' })
      }),
    });
    copy = subject.copy({
      str: 'bar',
      shallow: orig => this.store().createRecord('shallow', { str: `${orig.get('str')} (custom-copy)` }),
      deep: { shallow: orig => this.store().createRecord('shallow', { str: `${orig.get('str')} (custom-copy)`}) }
    });
  }
});

test('overwrites properties', function(assert) {
  assert.equal(copy.get('str'), 'bar');
  assert.equal(copy.get('shallow.str'), 'baz (custom-copy)');
  assert.equal(copy.get('deep.content.shallow.str'), 'shallow in deep (custom-copy)');
});
