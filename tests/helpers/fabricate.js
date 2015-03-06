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
    foos: DS.hasMany('foo', {async: async })
  });

  app.Multi = DS.Model.extend( Copyable, {
    bars: DS.hasMany('bar', {async: async }),
    baz: DS.belongsTo('baz', {async: async })
  });

  app.FooFix = DS.Model.extend( {
    property: DS.attr('string')
  });

  app.FooBar = DS.Model.extend( Copyable, {
    fooFix: DS.belongsTo('fooFix', { async: async })
  });
};

var setupFixtures = function(app) {
  app.Foo.reopenClass({
    FIXTURES: [
      {
        'id': '1',
        'property': 'prop1'
      },
      {
        'id': '2',
        'property': 'prop2'
      },
      {
        'id': '3',
        'property': 'prop3'
      }
    ]
  });

  app.Bar.reopenClass({
    FIXTURES: [
      {
        'id': '1',
        'foo': '1'
      }
    ]
  });

  app.Baz.reopenClass({
    FIXTURES: [
      {
        'id': '1',
        'foos': ['1', '2']
      }
    ]
  });

  app.Multi.reopenClass({
    FIXTURES: [
      {
        'id': '1',
        'bars': ['1'],
        'baz': '1'
      },
      {
        'id': '2',
        'bars': [],
        'baz': '1'
      }
    ]
  });

  app.FooFix.reopenClass({
    FIXTURES: [
      {
        'id': '1',
        'property': 'fix1'
      }
    ]
  });

  app.FooBar.reopenClass({
    FIXTURES: [
      {
        'id': '1',
        'fooFix': '1'
      }
    ]
  });
};

export default function fabricate(app, async) {

  setupModels(app, async);
  setupFixtures(app);
  app.ApplicationAdapter = DS.FixtureAdapter;
  return app.__container__.lookup('store:main');
}
