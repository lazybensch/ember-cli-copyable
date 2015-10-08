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

  strCustomCopy: attr('string', {
    copy(property) {
      return `${property} (copy)`;
    }
  }),

  rawCopyableWithFunction: attr(),
  rawCopyableWithProperty: attr(),

  bar: belongsTo('bar'),
  bars: hasMany('bar'),
  faa: belongsTo('faa'),
  faas: hasMany('faa'),

  barOverwrite: belongsTo('bar'),
  barsOverwrite: hasMany('bar'),

  faaNestedWithProperty: belongsTo('faa'),
  faaNestedWithFunction: belongsTo('faa')

});
