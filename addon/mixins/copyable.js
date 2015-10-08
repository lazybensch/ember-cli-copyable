import Ember from 'ember';
const {
  get,
  Mixin,
  typeOf
} = Ember;

const {
  camelize
} = Ember.String;

function copyFrom(original, copy, overwrite) {
  return copyFromKey.bind(null, original, copy, overwrite);
}

function copyFromKey(original, copy, overwrite, key, options) {
  let substitute = get(overwrite, key);
  if ((substitute === null || substitute === false || substitute === 0)) {
    copy.set(key, substitute);
  } else {
    const value = get(original, key);

    if (options && options.copy) {
      substitute = options.copy.bind(original)(value);
    }

    if (typeOf(substitute) === 'function') {
      substitute = substitute.bind(original)(value);
    }

    if (typeOf(substitute) === 'object') {
      copy.set(key, copyValue(value, substitute));
    } else {
      copy.set(key, substitute || copyValue(value));
    }

  }
}

function copyValue(obj, overwrite) {
  if (!obj) {
    return obj;
  }

  if (typeOf(obj.copy) === 'function') {
    return obj.copy(overwrite);
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
