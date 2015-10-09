import Ember from 'ember';
import DS from 'ember-data';
const {
  get,
  Mixin,
  ObjectProxy,
  typeOf
} = Ember;

const {
  camelize
} = Ember.String;

const {
  PromiseObject,
  PromiseManyArray
} = DS;

function copyFrom(original, copy, overwrite) {
  return copyFromKey.bind(null, original, copy, overwrite);
}

function copyFromKey(original, copy, overwrite, key, options) {

  let substitute = get(overwrite, key);
  if ((substitute === null || substitute === false || substitute === 0)) {
    return substitute;
  }

  const value = get(original, key);

  if (get(value, 'constructor') === PromiseObject) {
    const asdf = PromiseObject.create({
      promise: value.then((value) => {
        return value;
      })
    });

    asdf.then(x => console.log('WTF', x));
    return asdf;

  } else if (get(value, 'constructor') === PromiseManyArray) {
    // console.log(key, value.constructor);
    return [];
  } else {

    if (options && options.copy) {
      substitute = options.copy.bind(original)(value);
    }

    if (typeOf(substitute) === 'function') {
      substitute = substitute.bind(original)(value);
    }

    if (typeOf(substitute) === 'object') {
      return copyValue(value, substitute);
    } else {
      return substitute || copyValue(value);
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

    const copy = store.createRecord(camelize(objectClassKey), {
      bar: ObjectProxy.create({
        content: store.createRecord('bar')
      })
    });
    const copyFromKey = copyFrom(original, copy, overwrite);

    attributes.forEach(({ name: key, options }) => {
      const value = copyFromKey(key, options);
      copy.set(key, value);
    });

    relationships.forEach(({ key, options }) => {
      //const value = copyFromKey(key, options);
      //value.then(x => console.log('FTW', x));
      //copy.set(key, value);
      //copy.get(key).then(x => console.log('WWW', x));
    });

    return copy;
  }
});
