import Ember from 'ember';
import DS from 'ember-data';

const {
  A,
  get,
  set,
  Mixin,
  typeOf: emberTypeOf,
  RSVP: { Promise, allSettled }
} = Ember;

const {
  PromiseObject,
  PromiseManyArray
} = DS;

let failSafeAll = (array) => {
  return allSettled(array).then(response => {
    return A(response || []).mapBy('value').filter(e => e);
  });
};

export default Mixin.create({
  copyable: true,

  copy(options) {
    options = options || {};
    return this._copyAsync(options, {}).
                then((copy) => {
                  return this._applyOptions(options, copy);
                });
  },

  _applyOptions(options, copy) {
    if(!copy) {
      return;
    }

    for(let optionName in options) {
      let option = options[optionName];
      if(emberTypeOf(option) === 'object') {
        this._applyOptions(option, get(copy, optionName));
      } else {
        set(copy, optionName, option);
      }
    }

    return copy;
  },

  _copyAsync(options, copied) {
    return new Promise(resolve => {
      let model = this.constructor;
      let modelName = model.modelName || model.typeKey;
      let id = `${modelName}--${get(this, 'id')}`;
      if (copied.hasOwnProperty(id)) {
        return resolve(copied[id]);
      }

      let copy = get(this, 'store').createRecord(modelName);
      copied[id] = copy;
      let queue = [];

      model.eachAttribute((attr) => {
        switch(emberTypeOf(options[attr])) {
          case 'undefined':
            copy.set(attr, this.get(attr));
            break;
          case 'null':
            copy.set(attr, null);
            break;
          default:
            copy.set(attr, options[attr]);
        }
      });

      model.eachRelationship((relName, meta) => {
        let rel = get(this, relName);
        if (!rel) {
          return;
        }

        let relConstructor = get(rel, 'constructor');

        let passedOptions = {};

        switch(emberTypeOf(options[relName])) {
          case 'null':
            return;
          case 'instance':
            set(copy, relName, options[relName])
            break;
          case 'object':
            passedOptions = options[relName];
            break;
          case 'array':
            get(copy, relName).setObjects(options[relName]);
            break;
          default:
        }

        if (relConstructor === PromiseObject) {
          queue.push(rel.then(obj => {
            if (obj && get(obj, 'copyable')) {
              return obj._copyAsync(passedOptions, copied).then(objCopy => {
                set(copy, relName, objCopy);
              });
            } else {
              set(copy, relName, obj);
            }
          }));
        } else if (relConstructor === PromiseManyArray) {
          queue.push(rel.then(array => {
            let resolvedCopies = array.map(obj => {
              if (get(obj, 'copyable')) {
                return obj._copyAsync(passedOptions, copied);
              } else {
                return obj;
              }
            });
            return failSafeAll(resolvedCopies).then(copies => {
              get(copy, relName).setObjects(copies);
            });
          }));
        } else {
          if (meta.kind === 'belongsTo') {
            let obj = rel;

            if (obj && get(obj, 'copyable')) {
              queue.push(obj._copyAsync(passedOptions, copied).then(objCopy => {
                set(copy, relName, objCopy);
              }));
            } else {
              set(copy, relName, obj);
            }

          } else {
            let objs = rel;

            if (get(objs, 'content')) {
              objs = objs.get('content').compact();
            }

            if (get(objs, 'firstObject.copyable')) {

              let copies = objs.map(obj => {
                return obj.copy(passedOptions, copied);
              });

              queue.push(failSafeAll(copies).then(resolvedCopies => {
                get(copy, relName).setObjects(resolvedCopies);
              }));

            } else {
              get(copy, relName).setObjects(objs);
            }
          }

        }
      });


      failSafeAll(queue).then(() => {
        resolve(copy);
      });
    });
  }
});
