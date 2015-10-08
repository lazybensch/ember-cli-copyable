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

function copyFromKey(original, copy, overwrite, key, options) {
  const substitute = get(overwrite, key);
  if (substitute === null || substitute === false || substitute === 0) {
    copy.set(key, substitute);
  } else {
    const value = get(original, key);

    let defaultCopy;
    if (options && options.copy) {
      defaultCopy = options.copy.bind(original)(value);
    }

    copy.set(key, substitute || defaultCopy || copyValue(value));
  }
}

function copyValue(obj) {
  if (!obj) {
    return obj;
  }

  if (typeof obj.copy === 'function') {
    return obj.copy();
  } else {
    return get(obj, 'copy') || obj;
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

    attributes.forEach(({ name: key, options }) => {
      copyFromKey(key, options);
    });

    relationships.forEach(({ key, options }) => {
      copyFromKey(key, options);
    });

    return copy;
  }
});
