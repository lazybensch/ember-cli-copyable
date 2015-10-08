import Ember from 'ember';
const {
  get,
  Mixin
} = Ember;

const {
  camelize
} = Ember.String;

function copyFrom(original, copy, overwrite) {
  return copyFromKey.bind(null, original, copy, overwrite);
}

function copyFromKey(original, copy, overwrite, key) {
  const substitute = get(overwrite, key);
  if (substitute === null || substitute === false || substitute === 0) {
    copy.set(key, substitute);
  } else {
    copy.set(key, substitute || get(original, key));
  }
}

export default Mixin.create({
  copy(overwrite = {}) {

    const original = this;
    const store = this.get('store');
    const ObjectClass = this.get('constructor');
    const objectClassKey = get(ObjectClass, 'modelName');
    const attributes = get(ObjectClass, 'attributes');
    const relationships = get(ObjectClass, 'relationshipsByName');

    const copy = store.createRecord(camelize(objectClassKey));
    const copyFromKey = copyFrom(original, copy, overwrite);

    attributes.forEach(({ name: key }) => {
      copyFromKey(key);
    });

    relationships.forEach(({ key }) => {
      copyFromKey(key);
    });

    return copy;
  }
});
