import Ember from 'ember';
import DS from 'ember-data';
const { PromiseObject } = DS;
const { String: { camelize }, get, set, Mixin, typeOf, RSVP } = Ember;

function getCopy(key, kind) {
  let value = this.get(key);

  if (!value || !value.then) {
    value = RSVP.resolve(value);
  }

  return new RSVP.Promise(resolve => {
    value.then(value => {
      if (!value) {
        return resolve(value);
      }

      if (kind === 'hasMany'){
        return RSVP.all(value.map(item => item ? copyValue(item) : item)).then(resolve);
      } else {
        return resolve(copyValue(value));
      }
    });
  });
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

    const properties = {};
    const addProperties = (_, { name, key = key || name, kind }) => {
      const valuePromise = getCopy.bind(this)(key, kind);
      set(properties, key, valuePromise);
    }

    this.eachRelationship(addProperties);
    this.eachAttribute(addProperties);

    const store = this.get('store');
    const classKey = camelize(this.get('constructor.modelName'));

    return PromiseObject.create({
      promise: RSVP.hash(properties).then(properties => {
        return store.createRecord(classKey, properties);
      })
    });
  }
});
