import EmberData from 'ember-data';
import Copyable from 'ember-cli-copyable/mixins/copyable';
const { Model, attr, belongsTo } = EmberData;

export default Model.extend(Copyable, {

  str: attr('string'),
  shallow: belongsTo('shallow'),
  deep: belongsTo('deep'),

});
