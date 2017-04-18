import Ember from 'ember';
import DS from 'ember-data';

const {
  A,
  get,
  set,
  Mixin,
  typeOf,
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

  copy(options, copied) {
    options = options || {};
    copied = copied || {};

    return new Promise(resolve => {
      let model = this.constructor;
      let modelName = model.modelName || model.typeKey;
      let id = modelName + "--" + get(this, 'id');
      if (copied.hasOwnProperty(id)) {
        return resolve(copied[id]);
      }

      let copy = get(this, 'store').createRecord(modelName);
      copied[id] = copy;
      let queue = [];

      model.eachAttribute(attr => {
        switch(typeOf(options[attr])) {
          case 'undefined':
            set(copy, attr, get(this, attr));
            break;
          case 'null':
            set(copy, attr, null);
            break;
          default:
            set(copy, attr, options[attr]);
        }
      });

      model.eachRelationship((relName, meta) => {
        let rel = get(this, relName);
        if (!rel) { return; }

        let overwrite;
        let passedOptions = {};
        switch(typeOf(options[relName])) {
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

        if (rel.constructor === PromiseObject) {

          queue.push(rel.then(obj => {

            if (obj && get(obj, 'copyable') && !overwrite) {
              return obj.copy(passedOptions, copied).then(objCopy => {
                set(copy, relName, objCopy);
              });

            } else {
              set(copy, relName, overwrite || obj);
            }

          }));


        } else if (rel.constructor === PromiseManyArray) {

          if (overwrite) {
            get(copy, relName).setObjects(overwrite);
          } else {
            queue.push(rel.then(array => {
              let resolvedCopies =
                array.map(obj => {
                  if (get(obj, 'copyable')) {
                    return obj.copy(passedOptions, copied);
                  } else {
                    return obj;
                  }
                });
              return failSafeAll(resolvedCopies).then(copies => {
                get(copy, relName).setObjects(copies);
              });
            }));
          }
        } else {
          if (meta.kind === 'belongsTo') {
            let obj = rel;

            if (obj && get(obj, 'copyable') && !overwrite) {
              queue.push(obj.copy(passedOptions, copied).then(objCopy => {
                set(copy, relName, objCopy);
              }));
            } else {
              set(copy, relName, overwrite || obj);
            }

          } else {
            let objs = rel;

            if (get(objs, 'content')) {
              objs = objs.get('content').compact();
            }

            if (get(objs, 'firstObject.copyable') && !overwrite) {

              let copies = objs.map(obj => {
                return obj.copy(passedOptions, copied);
              });

              queue.push(failSafeAll(copies).then(resolvedCopies => {
                get(copy, relName).setObjects(resolvedCopies);
              }));

            } else {
              get(copy, relName).setObjects(overwrite || objs);
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
