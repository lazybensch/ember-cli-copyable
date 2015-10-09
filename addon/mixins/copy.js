import Ember from 'ember';
import DS from 'ember-data';
const { camelize } = Ember.String;
const { PromiseObject } = DS;

const {
  get,
  set,
  Mixin,
  typeOf,
  RSVP
} = Ember;

function getCopy(key, kind) {
  const value = this.get(key);

  return new RSVP.Promise((resolve,reject) => {

    if (!value) {
      resolve(value);
    }

    if (kind === 'belongsTo') {

      if (value.then) {
        value.then(value => resolve(copyValue(value)), err => reject(err));
      } else {
        resolve(copyValue(value));
      }

    } else if (kind === 'hasMany'){

      if (value.then) {
        value.then(value => resolve(value.map(item => copyValue(item))), err => reject(err));
      } else {
        resolve(copyValue(value.map(item => copyValue(item))));
      }

    } else {

      resolve(value);

    }

  })
}

function copyValue(value, overwrite) {
  if (typeOf(value.copy) === 'function') {
    return value.copy(overwrite);
  } else {
    return get(value, 'copy') || value;
  }
}

export default Mixin.create({
  copy() {

    const store = this.get('store');
    const ObjectClass = this.get('constructor');
    const objectClassKey = get(ObjectClass, 'modelName');
    console.log(`copying a "${objectClassKey}" object`);
    const properties = {};

    this.eachRelationship((_, { key, kind }) => {
      const valuePromise = getCopy.bind(this)(key, kind);
      set(properties, key, valuePromise);
    });

    this.eachAttribute((_, { name: key }) => {
      const valuePromise = getCopy.bind(this)(key, null);
      set(properties, key, valuePromise);
    });

    const promise = RSVP.hash(properties).then(properties => {
      console.log(`"${objectClassKey}" object created, with:`, properties);
      return store.createRecord(camelize(objectClassKey), properties);
    });

    return PromiseObject.create({ promise });
  }
});

