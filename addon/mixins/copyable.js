import Ember from 'ember';
const {
  get,
  Mixin
} = Ember;

const {
  camelize
} = Ember.String;

function copyFrom(original, copy) {
  return copyFromKey.bind(null, original, copy);
}

function copyFromKey(original, copy, key) {
  copy.set(key, get(original, key));
}

export default Mixin.create({
  copy() {

    const original = this;
    const store = this.get('store');
    const ObjectClass = this.get('constructor');
    const objectClassKey = get(ObjectClass, 'modelName');
    const attributes = get(ObjectClass, 'attributes');
    const relationships = get(ObjectClass, 'relationshipsByName');

    const copy = store.createRecord(camelize(objectClassKey));
    const copyFromKey = copyFrom(original, copy);

    attributes.forEach(({ name: key }) => {
      copyFromKey(key);
    });

    relationships.forEach(({ key }) => {
      copyFromKey(key);
    });

    return copy;
  }
});
