import DS from 'ember-data';
import Copyable from 'ember-cli-copyable/mixins/copyable';
const { Model, attr } = DS;

export default Model.extend(Copyable, {

  str: attr('string'),
  num: attr('Number'),
  bool: attr('Boolean'),
  raw: attr()

});
