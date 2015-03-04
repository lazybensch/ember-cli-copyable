import Ember from 'ember';
import DS from 'ember-data';

var Copyable = Ember.Mixin.create({

  copyable: true,
  copy: function() {

    var _this = this;
    return new Ember.RSVP.Promise(function(resolve) {

      var type = _this.constructor.typeKey;
      var attributes = _this._attributes;
      var relationships = _this._relationships;
      var copy = _this.get('store').createRecord(type);

      for (var attr in attributes) {
        copy.set(attr, _this.get(attr));
      }

      for (var rel in relationships) {
        if (_this.get(rel).constructor === DS.PromiseObject) {

          if (relationships[rel].relationshipMeta.kind === 'belongsTo') {
          } else {
          }

        } else {

          if (relationships[rel].relationshipMeta.kind === 'belongsTo') {
            var obj = _this.get(rel);

            if (obj.get('copyable')) {

              obj.copy().then(function(objCopy) {
                copy.set(rel, objCopy);
              });

            } else {
              copy.set(rel, obj);
            }
          } else {
            copy.get(rel).pushObjects(_this.get(rel));
          }

        }
      }

      resolve(copy);
    });
  }
});

export default Copyable;
