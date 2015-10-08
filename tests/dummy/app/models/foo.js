import DS from 'ember-data';
import Copyable from 'ember-cli-copyable/mixins/copyable';
const { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend(Copyable, {

  str: attr('string'),
  num: attr('Number'),
  bool: attr('Boolean'),
  raw: attr(),

  strOverwrite: attr('string'),
  numOverwrite: attr('Number'),
  boolOverwrite: attr('Boolean'),
  rawOverwrite: attr(),

  bar: belongsTo('bar'),
  boos: hasMany('boo'),

  barOverwrite: belongsTo('bar'),
  boosOverwrite: hasMany('boo')

});
