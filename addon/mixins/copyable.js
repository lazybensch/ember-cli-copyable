import Ember from 'ember';
import DS from 'ember-data';

var Copyable = Ember.Mixin.create({

  copyable: true,
  copy: function() {

    var _this = this;
    return new Ember.RSVP.Promise(function(resolve) {

      var model = _this.constructor;
      var copy = _this.get('store').createRecord(model.typeKey);
      var queue = [];

      model.eachAttribute(function(attr) {
        copy.set(attr, _this.get(attr));
      });

      model.eachRelationship(function(rel, meta) {
        if (Ember.none(_this.get(rel))) {
          return; //is this necessary?
        }

        if (_this.get(rel).constructor === DS.PromiseObject) {

          queue.pushObject(_this.get(rel).then(function(obj) {

            if (obj.get('copyable')) {
              return obj.copy().then(function(objCopy) {
                copy.set(rel, objCopy);
              });

            } else {
              copy.set(rel, obj);
            }

          }));


        } else if (_this.get(rel).constructor === DS.PromiseManyArray) {

          queue.pushObject(_this.get(rel).then(function(array) {

            array.forEach(function(obj) {
              if (obj.get('copyable')) {
                return obj.copy().then(function(objCopy) {
                  copy.get(rel).pushObject(objCopy);
                });

              } else {
                copy.get(rel).pushObject(obj);
              }
            });


          }));

        } else {

          if (meta.kind === 'belongsTo') {
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


      Ember.RSVP.all(queue).then(function() {
        resolve(copy);
      });
    });
  }
});

export default Copyable;
