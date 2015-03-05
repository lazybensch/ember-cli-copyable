import DS from 'ember-data';
import Copyable from 'ember-cli-copyable';

export default function setupModels(app, async){

  app.Foo = DS.Model.extend( Copyable, {
    prop: DS.attr('string')
  });

  app.Bar = DS.Model.extend( Copyable, {
    foo: DS.belongsTo('foo', { async: async })
  });

  app.Baz = DS.Model.extend( Copyable, {
    foos: DS.hasMany('foo', { async: async })
  });

  app.MultiBar = DS.Model.extend( Copyable, {
    bars: DS.hasMany('bar', { async: async }),
  });

  app.MultiBaz = DS.Model.extend( Copyable, {
    baz: DS.belongsTo('baz', { async: async })
  });

  app.MultiBarBaz = DS.Model.extend( Copyable, {
    baz: DS.belongsTo('baz', { async: async }),
    bars: DS.hasMany('bar', { async: async })
  });

  return app;

}
