import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
  copyable: true,
  copy: function(options, copied) {
    options = options || {};
    copied = copied || {};

    var _this = this;
    return new Ember.RSVP.Promise(function(resolve) {

      var model = _this.constructor;
      var modelName = model.modelName || model.typeKey;
      var id = modelName + "--" + _this.get('id');
      if (copied.hasOwnProperty(id)) {
        return resolve(copied[id]);
      }

      var copy = _this.get('store').createRecord(modelName);
      copied[id] = copy;
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

      model.eachRelationship(function(relName, meta) {
        var rel = _this.get(relName);
        if (!rel) { return; }

        var overwrite;
        var passedOptions = {};
        switch(Ember.typeOf(options[relName])) {
          case 'null':
          return;
          case 'instance':
            overwrite = options[relName];
            break;
          case 'object':
            passedOptions = options[relName];
            break;
          case 'array':
            overwrite = options[relName];
            break;
          default:
        }

        if (rel.constructor === DS.PromiseObject) {

          queue.push(rel.then(function(obj) {

            if (obj && obj.get('copyable') && !overwrite) {
              return obj.copy(passedOptions, copied).then(function(objCopy) {
                copy.set(relName, objCopy);
              });

            } else {
              copy.set(relName, overwrite || obj);
            }

          }));


        } else if (rel.constructor === DS.PromiseManyArray) {

          if (overwrite) {
            copy.get(relName).setObjects(overwrite);
          } else {
            queue.push(rel.then(function(array) {
              var resolvedCopies =
                array.map(function(obj) {
                  if (obj.get('copyable')) {
                    return obj.copy(passedOptions, copied);
                  } else {
                    return obj;
                  }
                });
              return Ember.RSVP.all(resolvedCopies).then(function(copies){
                copy.get(relName).setObjects(copies);
              });
            }));
          }
        } else {
          if (meta.kind === 'belongsTo') {
            var obj = rel;

            if (obj && obj.get('copyable') && !overwrite) {
              queue.push( obj.copy(passedOptions, copied).then(function(objCopy) {
                copy.set(relName, objCopy);
              }));
            } else {
              copy.set(relName, overwrite || obj);
            }

          } else {
            var objs = rel;

            if (objs.get('content')) {
              objs = objs.get('content').compact();
            }

            if (objs.get('firstObject.copyable') && !overwrite) {

              var copies = objs.map(function(obj) {
                return obj.copy(passedOptions, copied);
              });

              queue.push( Ember.RSVP.all(copies).then( function(resolvedCopies) {
                copy.get(relName).setObjects(resolvedCopies);
              }));

            } else {
              copy.get(relName).setObjects(overwrite || objs);
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
