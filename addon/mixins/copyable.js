import Ember from 'ember';
import DS from 'ember-data';

var Copyable = Ember.Mixin.create({

  copy: function() {

    var _this = this;
    return new Ember.RSVP.Promise(function(resolve) {

      var type = _this.constructor.typeKey;
      var attributes = _this._attributes;
      var relationships = _this._relationships;
      var copy = _this.get('store').createRecord(type);
      var queue = [];

      for (var attr in attributes) {
        copy.set(attr, _this.get(attr));
      }

      for (var rel in relationships) {
        if (_this.get(rel).constructor === DS.PromiseObject) {

          //console.log('found promise');
          if (relationships[rel].relationshipMeta.kind === 'belongsTo') {
          } else {
          }

        } else {

          //console.log('found instance');
          if (relationships[rel].relationshipMeta.kind === 'belongsTo') {
            copy.set(rel, _this.get(rel));
          } else {
            copy.get(rel).pushObjects(_this.get(rel));
          }

        }
      }

      Ember.RSVP.all(queue).then(function() {
        resolve(copy);
      });
    });
  }

});

export default Copyable;
