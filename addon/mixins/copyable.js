import Ember from 'ember';

var Copyable = Ember.Mixin.create({

  copy: function() {

    var _this = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {

      var type = _this.constructor.typeKey;
      var attributes = _this._attributes;
      var copy = _this.get('store').createRecord(type);

      for (var key in attributes) {
        copy.set(key, _this.get(key));
      }

      resolve(copy);
    });
  }

});

export default Copyable;
