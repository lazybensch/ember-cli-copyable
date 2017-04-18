import DS from 'ember-data';
import Copyable from 'ember-cli-copyable';

var setupModels = function(app, async) {
  app.Foo = DS.Model.extend( Copyable, {
    property: DS.attr('string')
  });

  app.Bar = DS.Model.extend( Copyable, {
    foo: DS.belongsTo('foo', { async: async })
  });

  app.Baz = DS.Model.extend( Copyable, {
    foos: DS.hasMany('foo', { async: async }),
    bar: DS.belongsTo('bar', { async: async })
  });

  app.NestedList = DS.Model.extend( Copyable, {
    baz: DS.hasMany('baz', { async: async })
  });

  app.Multi = DS.Model.extend( Copyable, {
    bars: DS.hasMany('bar', { async: async }),
    baz: DS.belongsTo('baz', { async: async })
  });

  app.FooFix = DS.Model.extend( {
    property: DS.attr('string')
  });

  app.FooBar = DS.Model.extend( Copyable, {
    fooFix: DS.belongsTo('fooFix', { async: async })
  });

  app.FooEmpty = DS.Model.extend( Copyable, {
    property: DS.attr('string'),
    foo: DS.belongsTo('foo', { async: async })
  });
};

export default function fabricate(app, async) {
  setupModels(app, async);
  return app.__container__.lookup('service:store');
}
