import EmberData from 'ember-data';
import Copyable from 'ember-cli-copyable/mixins/copy';
import Ember from 'ember';
const { Model, attr, belongsTo, hasMany } = EmberData;
const { resolve } = Ember.RSVP;

export default Model.extend(Copyable, {

  str: attr('string'),
  strFn: attr('string', { copy(val,ctx) {
    return `${val}${ctx.get('strFn')}${this.get('strFn')} (copy)`;
  } }),
  strPr: attr('string', { copy: (val) => resolve(`${val} (promise-copy)`) }),
  strAttr: attr('string', { copy: 'blub' }),

  num: attr('number'),
  numFn: attr('number', { copy(val,ctx) {
    return val + ctx.get('numFn') + this.get('numFn');
  } }),
  numPr: attr('number', { copy: (val) => resolve(`${val * 2}`) }),
  numAttr: attr('number', { copy: 0 }),

  bool: attr('boolean'),
  boolFn: attr('boolean', { copy(val,ctx) {
    return !val && !ctx.get('boolFn') && !this.get('boolFn');
  } }),
  boolPr: attr('boolean', { copy: () => resolve(true) }),
  boolAttr: attr('boolean', { copy: false }),

  raw: attr(),
  rawFn: attr({ copy(val,ctx) {
    return [val[4], ctx.get('rawFn')[4], this.get('rawFn')[4]];
  } }),
  rawPr: attr({ copy: () => resolve({}) }),
  rawAttr: attr({ copy: { a: 1 } }),

  shallow: belongsTo('shallow'),
  shallowFn: belongsTo('shallow', { copy(val) {
    return this.store.createRecord('shallow', { str: `${val.get('str')} copy` });
  } }),
  shallowPr: belongsTo('shallow', { copy: (val) => resolve(val) }),
  shallowAttr: belongsTo('shallow', { copy: null }),

  deep: belongsTo('deep'),
  deepFn: belongsTo('deep', { copy(val) {
    return this.store.createRecord('deep', { str: `${val.get('str')} copy` });
  } }),
  deepPr: belongsTo('deep', { copy: (val) => resolve(val) }),
  deepAttr: belongsTo('deep', { copy: null }),

  shallowSync: belongsTo('shallow', { async: false }),
  shallowFnSync: belongsTo('shallow', { async: false, copy(val) {
    return this.store.createRecord('shallow', { str: `${val.get('str')} copy` });
  } }),
  shallowPrSync: belongsTo('shallow', { async: false, copy: (val) => resolve(val) }),
  shallowAttrSync: belongsTo('shallow', { copy: null, async: false }),

  deepSync: belongsTo('deep' , { async: false }),
  deepFnSync: belongsTo('deep', { async: false, copy(val) {
    return this.store.createRecord('deep', { str: `${val.get('str')} copy` });
  } }),
  deepPrSync: belongsTo('deep', { async: false, copy: (val) => resolve(val) }),
  deepAttrSync: belongsTo('deep', { copy: null, async: false }),

  shallows: hasMany('shallow'),
  shallowsFn: hasMany('shallow', { copy(val) {
    return val.map(shallow => this.store.createRecord('shallow', { str: `${shallow.get('str')} copy` }) );
  } }),
  shallowsPr: hasMany('shallow', { copy: (val) => resolve(val) }),
  shallowsAttr: hasMany('shallow', { copy: [] }),

  deeps: hasMany('deep'),
  deepsFn: hasMany('deep', { copy(val) {
    return val.map(deep => this.store.createRecord('deep', { str: `${deep.get('str')} copy` }) );
  } }),
  deepsPr: hasMany('deep', { copy: (val) => resolve(val) }),
  deepsAttr: hasMany('deep', { copy: [] }),

  shallowsSync: hasMany('shallow', { async: false }),
  shallowsFnSync: hasMany('shallow', { async: false, copy(val) {
    return val.map(shallow => this.store.createRecord('shallow', { str: `${shallow.get('str')} copy` }) );
  } }),
  shallowsPrSync: hasMany('shallow', { async: false, copy: (val) => resolve(val) }),
  shallowsAttrSync: hasMany('shallow', { async: false, copy: [] }),

  deepsSync: hasMany('deep', { async: false }),
  deepsFnSync: hasMany('deep', { async: false, copy(val) {
    return val.map(deep => this.store.createRecord('deep', { str: `${deep.get('str')} copy` }) );
  } }),
  deepsPrSync: hasMany('deep', { async: false, copy: (val) => resolve(val) }),
  deepsAttrSync: hasMany('deep', { async: false, copy: [] }),

});
