import EmberData from 'ember-data';
const { Model, attr, belongsTo, hasMany } = EmberData;

export default Model.extend({

  str: attr('string'),

  shallow: belongsTo('shallow', { inverse: null }),
  shallowSync: belongsTo('shallow', { async: false, inverse: null }),

  deep: belongsTo('deep', { inverse: null }),
  deepSync: belongsTo('deep', { async: false, inverse: null }),

  shallows: hasMany('shallow', { inverse: null }),
  shallowsSync: hasMany('shallow', { async: false, inverse: null }),

  deeps: hasMany('deep', { inverse: null }),
  deepsSync: hasMany('deep', { async: false, inverse: null }),

});
