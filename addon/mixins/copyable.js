import Ember from 'ember';
import DS from 'ember-data';
const { PromiseObject } = DS;
const { String: { camelize }, get, set, Mixin, typeOf, RSVP } = Ember;

function getCustom(key, custom) {
  let value = this.get(key);

  return new RSVP.Promise(resolve => {
    if (typeOf(custom) === 'function') {
      const customValue = custom.bind(this)(value, this);
      if (customValue && customValue.then) {
        return customValue.then(resolve);
      } else {
        return resolve(customValue);
      }
    } else {
      return resolve(custom);
    }
  });
}

function getCopy(key, kind, option) {
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
        return RSVP.all(value.map(item => item ? copyValue(item, option) : item)).then(resolve);
      } else {
        return resolve(copyValue(value, option));
      }
    });
  });
}

function copyValue(value, option) {
  if (typeOf(value.copy) === 'function') {
    return value.copy(option);
  } else {
    return get(value, 'copy') || value;
  }
}

export default Mixin.create({
  copy(options = {}) {

    const properties = {};
    const addProperties = (_, { name, key = key || name, kind, options: { copy: custom } }) => { // jshint ignore:line
      const option = options[key] || custom;

      if (option !== undefined && (kind ? typeOf(option) !== 'object' : true)) {
        set(properties, key, getCustom.bind(this)(key, option));
      } else {
        set(properties, key, getCopy.bind(this)(key, kind, option));
      }
    };

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
