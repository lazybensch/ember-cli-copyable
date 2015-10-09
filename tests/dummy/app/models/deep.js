import EmberData from 'ember-data';
import Copyable from 'ember-cli-copyable/mixins/copy';
const { Model, attr } = EmberData;

export default Model.extend(Copyable, {

  str: attr('string')

});
