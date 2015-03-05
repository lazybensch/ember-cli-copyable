import Ember from 'ember';
import DS from 'ember-data';

var Copyable = Ember.Mixin.create({

  copyable: true,
  copy: function() {

    var _this = this;
    return new Ember.RSVP.Promise(function(resolve) {

      var type = _this.constructor.typeKey;
      var attributes = Ember.get(_this.constructor, 'attributes').keys.list;
      var relationships = _this._relationships;
      var copy = _this.get('store').createRecord(type);
      var queue = [];

      if (attributes.length) {
        attributes.forEach(function (attr) {
          copy.set(attr, _this.get(attr));
        });
      }

      if (Ember.keys(relationships).length) {
        Ember.keys(relationships).forEach(function (rel) {

          if (Ember.none(_this.get(rel))) {
            return;
          }

          if (_this.get(rel).constructor === DS.PromiseObject) {

            if (relationships[rel].relationshipMeta.kind === 'belongsTo') {
            } else {
            }

          } else {

            if (relationships[rel].relationshipMeta.kind === 'belongsTo') {
              var obj = _this.get(rel);

              if (obj.get('copyable')) {
                queue.pushObject( obj.copy().then(function(objCopy) {
                  copy.set(rel, objCopy);
                }));

              } else {
                copy.set(rel, obj);
              }

            } else {
              var objs = _this.get(rel);

              if (objs.get('firstObject.copyable')) {

                var copies = objs.map(function(obj) {
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
