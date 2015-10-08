import DS from 'ember-data';
const { Model, attr } = DS;

export default Model.extend({

  str: attr('string'),
  num: attr('Number'),
  bool: attr('Boolean'),
  raw: attr()

});
