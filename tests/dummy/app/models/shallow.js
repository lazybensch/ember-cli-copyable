import EmberData from 'ember-data';
const { Model, attr } = EmberData;

export default Model.extend({

  str: attr('string')

});
