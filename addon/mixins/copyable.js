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
      var obj, objs, copies, rel, attr, pushToRelation, setToRelation, copyObj;
      var queue = [];

      pushToRelation = function(resolvedCopies) {
        copy.get(rel).pushObjects(resolvedCopies);
      };

      setToRelation = function(objCopy) {
        copy.set(rel, objCopy);
      };

      copyObj = function(obj) {
        return obj.copy();
      };

      for (attr in attributes) {
        copy.set(attr, _this.get(attr));
      }

      for (rel in relationships) {
        if (_this.get(rel).constructor === DS.PromiseObject) {

          if (relationships[rel].relationshipMeta.kind === 'belongsTo') {
          } else {
          }

        } else {

          if (relationships[rel].relationshipMeta.kind === 'belongsTo') {
            obj = _this.get(rel);

            if (obj.get('copyable')) {
              queue.pushObject( obj.copy().then(setToRelation) );
            } else {
              copy.set(rel, obj);
            }

          } else {
            objs = _this.get(rel);

            if (objs.get('firstObject.copyable')) {

              copies = objs.map(copyObj);
              queue.pushObject( Ember.RSVP.all(copies).then(pushToRelation) );

            } else {
              copy.get(rel).pushObjects(objs);
            }
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
