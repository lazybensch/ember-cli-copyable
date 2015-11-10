module.exports = {
  scenarios: [
    {
      name: 'default',
      dependencies: { }
    },
    {
      name: 'minimum',
      dependencies: {
        'ember': '1.13.0',
        'ember-data': '2.0.0'
      }
    },
    {
      name: '2.0.0',
      dependencies: {
        'ember': '2.0.0',
        'ember-data': '2.0.0'
      }
    },
    {
      name: '2.1.0',
      dependencies: {
        'ember': '2.1.0',
        'ember-data': '2.1.0'
      }
    },
    {
      name: 'ember-release',
      dependencies: {
        'ember': 'components/ember#release'
      },
      resolutions: {
        'ember': 'release'
      }
    },
    {
      name: 'ember-beta',
      dependencies: {
        'ember': 'components/ember#beta'
      },
      resolutions: {
        'ember': 'beta'
      }
    },
    {
      name: 'ember-canary',
      dependencies: {
        'ember': 'components/ember#canary'
      },
      resolutions: {
        'ember': 'canary'
      }
    }
  ]
};
