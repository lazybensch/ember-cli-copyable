import Ember from 'ember';

var Copyable = Ember.Mixin.create({

  copy: function() {

    var _this = this;
    return new Ember.RSVP.Promise(function(resolve) {

      var type = _this.constructor.typeKey;
      var attributes = _this._attributes;
      var relationships = _this._relationships;
      var copy = _this.get('store').createRecord(type);

      for (var attribute in attributes) {
        copy.set(attribute, _this.get(attribute));
      }

      for (var relationship in relationships) {
        copy.set(relationship, _this.get(relationship));
      }

      resolve(copy);
    });
  }

});

export default Copyable;
