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
      var obj, objs, copies, attr;
      var queue = [];

      for (attr in attributes) {
        copy.set(attr, _this.get(attr));
      }

      if (Ember.keys(relationships).length) {
        Ember.keys(relationships).forEach(function (rel) {
          if (_this.get(rel).constructor === DS.PromiseObject) {

            if (relationships[rel].relationshipMeta.kind === 'belongsTo') {
            } else {
            }

          } else {

            if (relationships[rel].relationshipMeta.kind === 'belongsTo') {
              obj = _this.get(rel);

              if (obj.get('copyable')) {
                queue.pushObject( obj.copy().then(function(objCopy) {
                  copy.set(rel, objCopy);
                }));

              } else {
                copy.set(rel, obj);
              }

            } else {
              objs = _this.get(rel);

              if (objs.get('firstObject.copyable')) {

                copies = objs.map(function(obj) {
                  return obj.copy();
                });

                queue.pushObject( Ember.RSVP.all(copies).then( function(resolvedCopies) {
                  copy.get(rel).pushObjects(resolvedCopies);
                }));

              } else {
                copy.get(rel).pushObjects(objs);
              }
            }

          }
        });
      }

      Ember.RSVP.all(queue).then(function() {
        resolve(copy);
      });
    });
  }
});

export default Copyable;
