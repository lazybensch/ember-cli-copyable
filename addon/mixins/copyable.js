import Ember from 'ember';
import DS from 'ember-data';

var Copyable = Ember.Mixin.create({
  copyable: true,
  copy: function(options) {
    options = options || {};

    var _this = this;
    return new Ember.RSVP.Promise(function(resolve) {

      var model = _this.constructor;
      var copy = _this.get('store').createRecord(model.modelName || model.typeKey);
      var queue = [];

      model.eachAttribute(function(attr) {
        switch(Ember.typeOf(options[attr])) {
          case 'undefined':
              copy.set(attr, _this.get(attr));
              break;
          case 'null':
              copy.set(attr, null);
              break;
          default:
              copy.set(attr, options[attr]);
        }
      });

      model.eachRelationship(function(rel, meta) {
        if (!_this.get(rel)) {
          return;
        }

        var overwrite;
        var passedOptions = {};
        switch(Ember.typeOf(options[rel])) {
          case 'null':
              return;
          case 'instance':
              overwrite = options[rel];
              break;
          case 'object':
              passedOptions = options[rel];
              break;
          case 'array':
              overwrite = options[rel];
              break;
          default:
        }

        if (_this.get(rel).constructor === DS.PromiseObject) {

          queue.pushObject(_this.get(rel).then(function(obj) {

            if (obj && obj.get('copyable')) {
              return obj.copy(passedOptions).then(function(objCopy) {
                copy.set(rel, overwrite || objCopy);
              });

            } else {
              copy.set(rel, overwrite || obj);
            }

          }));


        } else if (_this.get(rel).constructor === DS.PromiseManyArray) {

          if (overwrite) {
            copy.get(rel).pushObjects(overwrite);
          } else {
            queue.pushObject(_this.get(rel).then(function(array) {

              array.forEach(function(obj) {
                if (obj.get('copyable')) {
                  return obj.copy(passedOptions).then(function(objCopy) {
                    copy.get(rel).pushObject(objCopy);
                  });

                } else {
                  copy.get(rel).pushObject(obj);
                }
              });
            }));
          }

        } else {

          if (meta.kind === 'belongsTo') {
            var obj = _this.get(rel);

            if (obj && obj.get('copyable')) {
              queue.pushObject( obj.copy(passedOptions).then(function(objCopy) {
                copy.set(rel, overwrite || objCopy);
              }));

            } else {
              copy.set(rel, overwrite || obj);
            }

          } else {
            var objs = _this.get(rel);

            if (objs.get('content')) {
              objs = objs.get('content').compact();
            }

            if (objs.get('firstObject.copyable')) {

              var copies = objs.map(function(obj) {
                return obj.copy(passedOptions);
              });

              if (overwrite) {
                copy.get(rel).pushObjects(overwrite);
              } else {
                queue.pushObject( Ember.RSVP.all(copies).then( function(resolvedCopies) {
                  copy.get(rel).pushObjects(resolvedCopies);
                }));
              }


            } else {
              copy.get(rel).pushObjects(overwrite || objs);
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
