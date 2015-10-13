import EmberData from 'ember-data';
import Copyable from 'ember-cli-copyable/mixins/copy';
const { Model, attr, belongsTo, hasMany } = EmberData;

export default Model.extend(Copyable, {

  str: attr('string'),

  shallow: belongsTo('shallow'),
  shallowSync: belongsTo('shallow', { async: false }),
  deep: belongsTo('deep'),
  deepSync: belongsTo('deep', { async: false }),

  shallows: hasMany('shallow'),
  shallowsSync: hasMany('shallow', { async: false }),
  deeps: hasMany('deep'),
  deepsSync: hasMany('deep', { async: false })

});
