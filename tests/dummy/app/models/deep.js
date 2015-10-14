import EmberData from 'ember-data';
import Copyable from 'ember-cli-copyable/mixins/copyable';
const { Model, attr, belongsTo, hasMany } = EmberData;

export default Model.extend(Copyable, {

  str: attr('string'),

  shallow: belongsTo('shallow', { inverse: null }),
  shallowSync: belongsTo('shallow', { async: false, inverse: null }),

  deep: belongsTo('deep', { inverse: null }),
  deepSync: belongsTo('deep', { inverse: null, async: false }),

  shallows: hasMany('shallow', { inverse: null }),
  shallowsSync: hasMany('shallow', { async: false, inverse: null }),

  deeps: hasMany('deep', { inverse: null }),
  deepsSync: hasMany('deep', { async: false, inverse: null }),

});
