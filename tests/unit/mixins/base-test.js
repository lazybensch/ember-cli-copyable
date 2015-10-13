import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

let subject, copy;
function beforeAll(module) {
  subject = module.subject({
    str: 'base-string',

    shallow: module.store().createRecord('shallow', {
      str: 'shallow-string',
      shallow: module.store().createRecord('shallow', { str: 'shallow.shallow-string', }),
      shallowSync: module.store().createRecord('shallow', { str: 'shallow.shallow-sync-string', }),
      deep: module.store().createRecord('deep', { str: 'shallow.deep-string', }),
      deepSync: module.store().createRecord('deep', { str: 'shallow.deep-sync-string', }),
      shallows: [
        module.store().createRecord('shallow', {
          str: 'deep-shallow-string-0',
          shallows: [
            module.store().createRecord('shallow', { str: 'shallow-shallow-string-0.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-shallow-string-0.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'shallow-shallow-string-0.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-shallow-string-0.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'shallow-hallow-string-0.deep-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-hallow-string-0.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'shallow-hallow-string-0.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-hallow-string-0.deep-sync-string-1' })
          ]
        }),
        module.store().createRecord('shallow', {
          str: 'deep-shallow-string-1',
          shallows: [
            module.store().createRecord('shallow', { str: 'shallow-shallow-string-0.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-shallow-string-0.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'shallow-shallow-string-0.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-shallow-string-0.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'shallow-hallow-string-0.deep-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-hallow-string-0.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'shallow-hallow-string-0.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-hallow-string-0.deep-sync-string-1' })
          ]
        }),
      ],
      shallowsSync: [
        module.store().createRecord('shallow', {
          str: 'shallow-sync-string-0',
          shallows: [
            module.store().createRecord('shallow', { str: 'shallow-sync-string-0.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-sync-string-0.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'shallow-sync-string-0.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-sync-string-0.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'shallow-sync-string-0.deep-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-sync-string-0.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'shallow-sync-string-0.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-sync-string-0.deep-sync-string-1' })
          ]

        }),
        module.store().createRecord('shallow', {
          str: 'shallow-sync-string-1',
          shallows: [
            module.store().createRecord('shallow', { str: 'shallow-sync-string-1.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-sync-string-1.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'shallow-sync-string-1.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-sync-string-1.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'shallow-sync-string-1.deep-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-sync-string-1.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'shallow-sync-string-1.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-sync-string-1.deep-sync-string-1' })
          ]

        })
      ],
      deeps: [
        module.store().createRecord('deep', {
          str: 'deep-string-0',
          shallows: [
            module.store().createRecord('shallow', { str: 'deep-string-0.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-string-0.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'deep-string-0.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-string-0.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'deep-string-0.deep-string-0' }),
            module.store().createRecord('deep', { str: 'deep-string-0.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'deep-string-0.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'deep-string-0.deep-sync-string-1' })
          ]
        }),
        module.store().createRecord('deep', {
          str: 'deep-string-1',
          shallows: [
            module.store().createRecord('shallow', { str: 'deep-string-1.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-string-1.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'deep-string-1.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-string-1.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'deep-string-1.deep-string-0' }),
            module.store().createRecord('deep', { str: 'deep-string-1.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'deep-string-1.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'deep-string-1.deep-sync-string-1' })
          ]
        })
      ],
      deepsSync: [
        module.store().createRecord('deep', {
          str: 'deep-sync-string-0',
          shallows: [
            module.store().createRecord('shallow', { str: 'deep-sync-string-0.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-sync-string-0.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'deep-sync-string-0.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-sync-string-0.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'deep-sync-string-0.deep-string-0' }),
            module.store().createRecord('deep', { str: 'deep-sync-string-0.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'deep-sync-string-0.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'deep-sync-string-0.deep-sync-string-1' })
          ]
        }),
        module.store().createRecord('deep', {
          str: 'deep-sync-string-1',
          shallows: [
            module.store().createRecord('shallow', { str: 'deep-sync-string-1.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-sync-string-1.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'deep-sync-string-1.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-sync-string-1.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'deep-sync-string-1.deep-string-0' }),
            module.store().createRecord('deep', { str: 'deep-sync-string-1.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'deep-sync-string-1.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'deep-sync-string-1.deep-sync-string-1' })
          ]
        })
      ]
    }),
    shallowSync: module.store().createRecord('shallow', {
      str: 'shallow-sync-string',
      shallow: module.store().createRecord('shallow', { str: 'shallow-sync.shallow-string', }),
      shallowSync: module.store().createRecord('shallow', { str: 'shallow-sync.shallow-sync-string' }),
      deep: module.store().createRecord('deep', { str: 'shallow-sync.deep-string', }),
      deepSync: module.store().createRecord('deep', { str: 'shallow-sync.deep-sync-string', }),
      shallows: [
        module.store().createRecord('shallow', {
          str: 'deep-shallow-string-0',
          shallows: [
            module.store().createRecord('shallow', { str: 'shallow-sync-shallow-string-0.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-sync-shallow-string-0.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'shallow-sync-shallow-string-0.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-sync-shallow-string-0.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'shallow-sync-shallow-string-0.deep-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-sync-shallow-string-0.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'shallow-sync-shallow-string-0.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-sync-shallow-string-0.deep-sync-string-1' })
          ]
        }),
        module.store().createRecord('shallow', {
          str: 'deep-shallow-string-1',
          shallows: [
            module.store().createRecord('shallow', { str: 'shallow-shallow-string-0.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-shallow-string-0.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'shallow-shallow-string-0.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-shallow-string-0.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'shallow-hallow-string-0.deep-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-hallow-string-0.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'shallow-hallow-string-0.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-hallow-string-0.deep-sync-string-1' })
          ]
        }),
      ],
      shallowsSync: [
        module.store().createRecord('shallow', {
          str: 'shallow-sync-string-0',
          shallows: [
            module.store().createRecord('shallow', { str: 'shallow-sync-string-0.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-sync-string-0.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'shallow-sync-string-0.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-sync-string-0.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'shallow-sync-string-0.deep-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-sync-string-0.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'shallow-sync-string-0.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-sync-string-0.deep-sync-string-1' })
          ]

        }),
        module.store().createRecord('shallow', {
          str: 'shallow-sync-string-1',
          shallows: [
            module.store().createRecord('shallow', { str: 'shallow-sync-string-1.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-sync-string-1.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'shallow-sync-string-1.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-sync-string-1.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'shallow-sync-string-1.deep-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-sync-string-1.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'shallow-sync-string-1.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-sync-string-1.deep-sync-string-1' })
          ]

        })
      ],
      deeps: [
        module.store().createRecord('deep', {
          str: 'deep-string-0',
          shallows: [
            module.store().createRecord('shallow', { str: 'deep-string-0.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-string-0.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'deep-string-0.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-string-0.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'deep-string-0.deep-string-0' }),
            module.store().createRecord('deep', { str: 'deep-string-0.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'deep-string-0.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'deep-string-0.deep-sync-string-1' })
          ]
        }),
        module.store().createRecord('deep', {
          str: 'deep-string-1',
          shallows: [
            module.store().createRecord('shallow', { str: 'deep-string-1.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-string-1.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'deep-string-1.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-string-1.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'deep-string-1.deep-string-0' }),
            module.store().createRecord('deep', { str: 'deep-string-1.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'deep-string-1.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'deep-string-1.deep-sync-string-1' })
          ]
        })
      ],
      deepsSync: [
        module.store().createRecord('deep', {
          str: 'deep-sync-string-0',
          shallows: [
            module.store().createRecord('shallow', { str: 'deep-sync-string-0.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-sync-string-0.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'deep-sync-string-0.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-sync-string-0.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'deep-sync-string-0.deep-string-0' }),
            module.store().createRecord('deep', { str: 'deep-sync-string-0.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'deep-sync-string-0.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'deep-sync-string-0.deep-sync-string-1' })
          ]
        }),
        module.store().createRecord('deep', {
          str: 'deep-sync-string-1',
          shallows: [
            module.store().createRecord('shallow', { str: 'deep-sync-string-1.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-sync-string-1.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'deep-sync-string-1.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-sync-string-1.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'deep-sync-string-1.deep-string-0' }),
            module.store().createRecord('deep', { str: 'deep-sync-string-1.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'deep-sync-string-1.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'deep-sync-string-1.deep-sync-string-1' })
          ]
        })
      ]
    }),
    deep: module.store().createRecord('deep', {
      str: 'deep-string',
      shallow: module.store().createRecord('shallow', { str: 'deep.shallow-string', }),
      shallowSync: module.store().createRecord('shallow', { str: 'deep.shallow-sync-string' }),
      deepSync: module.store().createRecord('deep', { str: 'deep.deep-sync-string', }),
      deep: module.store().createRecord('deep', { str: 'deep.deep-string', }),
      shallows: [
        module.store().createRecord('shallow', {
          str: 'deep-shallow-string-0',
          shallows: [
            module.store().createRecord('shallow', { str: 'deep-shallow-string-0.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-shallow-string-0.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'deep-shallow-string-0.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-shallow-string-0.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'deep-hallow-string-0.deep-string-0' }),
            module.store().createRecord('deep', { str: 'deep-hallow-string-0.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'deep-hallow-string-0.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'deep-hallow-string-0.deep-sync-string-1' })
          ]
        }),
        module.store().createRecord('shallow', {
          str: 'deep-shallow-string-1',
          shallows: [
            module.store().createRecord('shallow', { str: 'shallow-shallow-string-0.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-shallow-string-0.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'shallow-shallow-string-0.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-shallow-string-0.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'shallow-hallow-string-0.deep-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-hallow-string-0.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'shallow-hallow-string-0.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-hallow-string-0.deep-sync-string-1' })
          ]
        }),
      ],
      shallowsSync: [
        module.store().createRecord('shallow', {
          str: 'shallow-sync-string-0',
          shallows: [
            module.store().createRecord('shallow', { str: 'shallow-sync-string-0.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-sync-string-0.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'shallow-sync-string-0.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-sync-string-0.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'shallow-sync-string-0.deep-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-sync-string-0.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'shallow-sync-string-0.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-sync-string-0.deep-sync-string-1' })
          ]

        }),
        module.store().createRecord('shallow', {
          str: 'shallow-sync-string-1',
          shallows: [
            module.store().createRecord('shallow', { str: 'shallow-sync-string-1.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-sync-string-1.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'shallow-sync-string-1.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-sync-string-1.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'shallow-sync-string-1.deep-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-sync-string-1.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'shallow-sync-string-1.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-sync-string-1.deep-sync-string-1' })
          ]

        })
      ],
      deeps: [
        module.store().createRecord('deep', {
          str: 'deep-string-0',
          shallows: [
            module.store().createRecord('shallow', { str: 'deep-string-0.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-string-0.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'deep-string-0.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-string-0.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'deep-string-0.deep-string-0' }),
            module.store().createRecord('deep', { str: 'deep-string-0.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'deep-string-0.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'deep-string-0.deep-sync-string-1' })
          ]
        }),
        module.store().createRecord('deep', {
          str: 'deep-string-1',
          shallows: [
            module.store().createRecord('shallow', { str: 'deep-string-1.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-string-1.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'deep-string-1.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-string-1.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'deep-string-1.deep-string-0' }),
            module.store().createRecord('deep', { str: 'deep-string-1.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'deep-string-1.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'deep-string-1.deep-sync-string-1' })
          ]
        })
      ],
      deepsSync: [
        module.store().createRecord('deep', {
          str: 'deep-sync-string-0',
          shallows: [
            module.store().createRecord('shallow', { str: 'deep-sync-string-0.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-sync-string-0.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'deep-sync-string-0.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-sync-string-0.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'deep-sync-string-0.deep-string-0' }),
            module.store().createRecord('deep', { str: 'deep-sync-string-0.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'deep-sync-string-0.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'deep-sync-string-0.deep-sync-string-1' })
          ]
        }),
        module.store().createRecord('deep', {
          str: 'deep-sync-string-1',
          shallows: [
            module.store().createRecord('shallow', { str: 'deep-sync-string-1.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-sync-string-1.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'deep-sync-string-1.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-sync-string-1.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'deep-sync-string-1.deep-string-0' }),
            module.store().createRecord('deep', { str: 'deep-sync-string-1.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'deep-sync-string-1.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'deep-sync-string-1.deep-sync-string-1' })
          ]
        })
      ]
    }),
    deepSync: module.store().createRecord('deep', {
      str: 'deep-sync-string',
      shallow: module.store().createRecord('shallow', { str: 'deep-sync.shallow-string', }),
      shallowSync: module.store().createRecord('shallow', { str: 'deep-sync.shallow-sync-string' }),
      deepSync: module.store().createRecord('deep', { str: 'deep-sync.deep-sync-string', }),
      deep: module.store().createRecord('deep', { str: 'deep-sync.deep-string', }),
      shallows: [
        module.store().createRecord('shallow', {
          str: 'deep-shallow-string-0',
          shallows: [
            module.store().createRecord('shallow', { str: 'deep-sync-shallow-string-0.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-sync-shallow-string-0.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'deep-sync-shallow-string-0.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-sync-shallow-string-0.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'deep-sync-shallow-string-0.deep-string-0' }),
            module.store().createRecord('deep', { str: 'deep-sync-shallow-string-0.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'deep-shallow-string-0.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'deep-shallow-string-0.deep-sync-string-1' })
          ]
        }),
        module.store().createRecord('shallow', {
          str: 'deep-shallow-string-1',
          shallows: [
            module.store().createRecord('shallow', { str: 'shallow-shallow-string-0.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-shallow-string-0.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'shallow-shallow-string-0.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-shallow-string-0.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'shallow-hallow-string-0.deep-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-hallow-string-0.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'shallow-hallow-string-0.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-hallow-string-0.deep-sync-string-1' })
          ]
        }),
      ],
      shallowsSync: [
        module.store().createRecord('shallow', {
          str: 'shallow-sync-string-0',
          shallows: [
            module.store().createRecord('shallow', { str: 'shallow-sync-string-0.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-sync-string-0.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'shallow-sync-string-0.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-sync-string-0.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'shallow-sync-string-0.deep-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-sync-string-0.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'shallow-sync-string-0.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-sync-string-0.deep-sync-string-1' })
          ]

        }),
        module.store().createRecord('shallow', {
          str: 'shallow-sync-string-1',
          shallows: [
            module.store().createRecord('shallow', { str: 'shallow-sync-string-1.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-sync-string-1.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'shallow-sync-string-1.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'shallow-sync-string-1.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'shallow-sync-string-1.deep-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-sync-string-1.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'shallow-sync-string-1.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'shallow-sync-string-1.deep-sync-string-1' })
          ]

        })
      ],
      deeps: [
        module.store().createRecord('deep', {
          str: 'deep-string-0',
          shallows: [
            module.store().createRecord('shallow', { str: 'deep-string-0.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-string-0.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'deep-string-0.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-string-0.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'deep-string-0.deep-string-0' }),
            module.store().createRecord('deep', { str: 'deep-string-0.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'deep-string-0.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'deep-string-0.deep-sync-string-1' })
          ]
        }),
        module.store().createRecord('deep', {
          str: 'deep-string-1',
          shallows: [
            module.store().createRecord('shallow', { str: 'deep-string-1.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-string-1.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'deep-string-1.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-string-1.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'deep-string-1.deep-string-0' }),
            module.store().createRecord('deep', { str: 'deep-string-1.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'deep-string-1.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'deep-string-1.deep-sync-string-1' })
          ]
        })
      ],
      deepsSync: [
        module.store().createRecord('deep', {
          str: 'deep-sync-string-0',
          shallows: [
            module.store().createRecord('shallow', { str: 'deep-sync-string-0.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-sync-string-0.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'deep-sync-string-0.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-sync-string-0.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'deep-sync-string-0.deep-string-0' }),
            module.store().createRecord('deep', { str: 'deep-sync-string-0.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'deep-sync-string-0.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'deep-sync-string-0.deep-sync-string-1' })
          ]
        }),
        module.store().createRecord('deep', {
          str: 'deep-sync-string-1',
          shallows: [
            module.store().createRecord('shallow', { str: 'deep-sync-string-1.shallow-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-sync-string-1.shallow-string-1' })
          ],
          shallowsSync: [
            module.store().createRecord('shallow', { str: 'deep-sync-string-1.shallow-sync-string-0' }),
            module.store().createRecord('shallow', { str: 'deep-sync-string-1.shallow-sync-string-1' })
          ],
          deeps: [
            module.store().createRecord('deep', { str: 'deep-sync-string-1.deep-string-0' }),
            module.store().createRecord('deep', { str: 'deep-sync-string-1.deep-string-1' })
          ],
          deepsSync: [
            module.store().createRecord('deep', { str: 'deep-sync-string-1.deep-sync-string-0' }),
            module.store().createRecord('deep', { str: 'deep-sync-string-1.deep-sync-string-1' })
          ]
        })
      ]
    }),

    shallows: [
      module.store().createRecord('shallow', {
        str: 'shallow-string-0',
        shallow: module.store().createRecord('shallow', { str: 'shallow.shallow-string', }),
        shallowSync: module.store().createRecord('shallow', { str: 'shallow.shallow-sync-string', }),
        deep: module.store().createRecord('deep', { str: 'shallow.deep-string', }),
        deepSync: module.store().createRecord('deep', { str: 'shallow.deep-sync-string', }),
        shallows: [
          module.store().createRecord('shallow', { str: 'shallow-string-0.shallow-string-0' }),
          module.store().createRecord('shallow', { str: 'shallow-string-0.shallow-string-1' })
        ],
        shallowsSync: [
          module.store().createRecord('shallow', { str: 'shallow-string-0.shallow-sync-string-0' }),
          module.store().createRecord('shallow', { str: 'shallow-string-0.shallow-sync-string-1' })
        ],
        deeps: [
          module.store().createRecord('deep', { str: 'shallow-string-0.deep-string-0' }),
          module.store().createRecord('deep', { str: 'shallow-string-0.deep-string-1' })
        ],
        deepsSync: [
          module.store().createRecord('deep', { str: 'shallow-string-0.deep-sync-string-0' }),
          module.store().createRecord('deep', { str: 'shallow-string-0.deep-sync-string-1' })
        ]
      }),
      module.store().createRecord('shallow', {
        str: 'shallow-string-1',
        shallow: module.store().createRecord('shallow', { str: 'shallow.shallow-string', }),
        shallowSync: module.store().createRecord('shallow', { str: 'shallow.shallow-sync-string', }),
        deep: module.store().createRecord('deep', { str: 'shallow.deep-string', }),
        deepSync: module.store().createRecord('deep', { str: 'shallow.deep-sync-string', }),
        shallows: [
          module.store().createRecord('shallow', { str: 'shallow-string-1.shallow-string-0' }),
          module.store().createRecord('shallow', { str: 'shallow-string-1.shallow-string-1' })
        ],
        shallowsSync: [
          module.store().createRecord('shallow', { str: 'shallow-string-1.shallow-sync-string-0' }),
          module.store().createRecord('shallow', { str: 'shallow-string-1.shallow-sync-string-1' })
        ],
        deeps: [
          module.store().createRecord('deep', { str: 'shallow-string-1.deep-string-0' }),
          module.store().createRecord('deep', { str: 'shallow-string-1.deep-string-1' })
        ],
        deepsSync: [
          module.store().createRecord('deep', { str: 'shallow-string-1.deep-sync-string-0' }),
          module.store().createRecord('deep', { str: 'shallow-string-1.deep-sync-string-1' })
        ]
      })
    ],
    shallowsSync: [
      module.store().createRecord('shallow', {
        str: 'shallow-sync-string-0',
        shallow: module.store().createRecord('shallow', { str: 'shallow.shallow-string', }),
        shallowSync: module.store().createRecord('shallow', { str: 'shallow.shallow-sync-string', }),
        deep: module.store().createRecord('deep', { str: 'shallow.deep-string', }),
        deepSync: module.store().createRecord('deep', { str: 'shallow.deep-sync-string', }),
        shallows: [
          module.store().createRecord('shallow', { str: 'shallow-sync-string-0.shallow-string-0' }),
          module.store().createRecord('shallow', { str: 'shallow-sync-string-0.shallow-string-1' })
        ],
        shallowsSync: [
          module.store().createRecord('shallow', { str: 'shallow-sync-string-0.shallow-sync-string-0' }),
          module.store().createRecord('shallow', { str: 'shallow-sync-string-0.shallow-sync-string-1' })
        ],
        deeps: [
          module.store().createRecord('deep', { str: 'shallow-sync-string-0.deep-string-0' }),
          module.store().createRecord('deep', { str: 'shallow-sync-string-0.deep-string-1' })
        ],
        deepsSync: [
          module.store().createRecord('deep', { str: 'shallow-sync-string-0.deep-sync-string-0' }),
          module.store().createRecord('deep', { str: 'shallow-sync-string-0.deep-sync-string-1' })
        ]

      }),
      module.store().createRecord('shallow', {
        str: 'shallow-sync-string-1',
        shallow: module.store().createRecord('shallow', { str: 'shallow.shallow-string', }),
        shallowSync: module.store().createRecord('shallow', { str: 'shallow.shallow-sync-string', }),
        deep: module.store().createRecord('deep', { str: 'shallow.deep-string', }),
        deepSync: module.store().createRecord('deep', { str: 'shallow.deep-sync-string', }),
        shallows: [
          module.store().createRecord('shallow', { str: 'shallow-sync-string-1.shallow-string-0' }),
          module.store().createRecord('shallow', { str: 'shallow-sync-string-1.shallow-string-1' })
        ],
        shallowsSync: [
          module.store().createRecord('shallow', { str: 'shallow-sync-string-1.shallow-sync-string-0' }),
          module.store().createRecord('shallow', { str: 'shallow-sync-string-1.shallow-sync-string-1' })
        ],
        deeps: [
          module.store().createRecord('deep', { str: 'shallow-sync-string-1.deep-string-0' }),
          module.store().createRecord('deep', { str: 'shallow-sync-string-1.deep-string-1' })
        ],
        deepsSync: [
          module.store().createRecord('deep', { str: 'shallow-sync-string-1.deep-sync-string-0' }),
          module.store().createRecord('deep', { str: 'shallow-sync-string-1.deep-sync-string-1' })
        ]

      })
    ],
    deeps: [
      module.store().createRecord('deep', {
        str: 'deep-string-0',
        shallow: module.store().createRecord('shallow', { str: 'shallow.shallow-string', }),
        shallowSync: module.store().createRecord('shallow', { str: 'shallow.shallow-sync-string', }),
        deep: module.store().createRecord('deep', { str: 'shallow.deep-string', }),
        deepSync: module.store().createRecord('deep', { str: 'shallow.deep-sync-string', }),
        shallows: [
          module.store().createRecord('shallow', { str: 'deep-string-0.shallow-string-0' }),
          module.store().createRecord('shallow', { str: 'deep-string-0.shallow-string-1' })
        ],
        shallowsSync: [
          module.store().createRecord('shallow', { str: 'deep-string-0.shallow-sync-string-0' }),
          module.store().createRecord('shallow', { str: 'deep-string-0.shallow-sync-string-1' })
        ],
        deeps: [
          module.store().createRecord('deep', { str: 'deep-string-0.deep-string-0' }),
          module.store().createRecord('deep', { str: 'deep-string-0.deep-string-1' })
        ],
        deepsSync: [
          module.store().createRecord('deep', { str: 'deep-string-0.deep-sync-string-0' }),
          module.store().createRecord('deep', { str: 'deep-string-0.deep-sync-string-1' })
        ]
      }),
      module.store().createRecord('deep', {
        str: 'deep-string-1',
        shallow: module.store().createRecord('shallow', { str: 'shallow.shallow-string', }),
        shallowSync: module.store().createRecord('shallow', { str: 'shallow.shallow-sync-string', }),
        deep: module.store().createRecord('deep', { str: 'shallow.deep-string', }),
        deepSync: module.store().createRecord('deep', { str: 'shallow.deep-sync-string', }),
        shallows: [
          module.store().createRecord('shallow', { str: 'deep-string-1.shallow-string-0' }),
          module.store().createRecord('shallow', { str: 'deep-string-1.shallow-string-1' })
        ],
        shallowsSync: [
          module.store().createRecord('shallow', { str: 'deep-string-1.shallow-sync-string-0' }),
          module.store().createRecord('shallow', { str: 'deep-string-1.shallow-sync-string-1' })
        ],
        deeps: [
          module.store().createRecord('deep', { str: 'deep-string-1.deep-string-0' }),
          module.store().createRecord('deep', { str: 'deep-string-1.deep-string-1' })
        ],
        deepsSync: [
          module.store().createRecord('deep', { str: 'deep-string-1.deep-sync-string-0' }),
          module.store().createRecord('deep', { str: 'deep-string-1.deep-sync-string-1' })
        ]
      })
    ],
    deepsSync: [
      module.store().createRecord('deep', {
        str: 'deep-sync-string-0',
        shallow: module.store().createRecord('shallow', { str: 'shallow.shallow-string', }),
        shallowSync: module.store().createRecord('shallow', { str: 'shallow.shallow-sync-string', }),
        deep: module.store().createRecord('deep', { str: 'shallow.deep-string', }),
        deepSync: module.store().createRecord('deep', { str: 'shallow.deep-sync-string', }),
        shallows: [
          module.store().createRecord('shallow', { str: 'deep-sync-string-0.shallow-string-0' }),
          module.store().createRecord('shallow', { str: 'deep-sync-string-0.shallow-string-1' })
        ],
        shallowsSync: [
          module.store().createRecord('shallow', { str: 'deep-sync-string-0.shallow-sync-string-0' }),
          module.store().createRecord('shallow', { str: 'deep-sync-string-0.shallow-sync-string-1' })
        ],
        deeps: [
          module.store().createRecord('deep', { str: 'deep-sync-string-0.deep-string-0' }),
          module.store().createRecord('deep', { str: 'deep-sync-string-0.deep-string-1' })
        ],
        deepsSync: [
          module.store().createRecord('deep', { str: 'deep-sync-string-0.deep-sync-string-0' }),
          module.store().createRecord('deep', { str: 'deep-sync-string-0.deep-sync-string-1' })
        ]
      }),
      module.store().createRecord('deep', {
        str: 'deep-sync-string-1',
        shallow: module.store().createRecord('shallow', { str: 'shallow.shallow-string', }),
        shallowSync: module.store().createRecord('shallow', { str: 'shallow.shallow-sync-string', }),
        deep: module.store().createRecord('deep', { str: 'shallow.deep-string', }),
        deepSync: module.store().createRecord('deep', { str: 'shallow.deep-sync-string', }),
        shallows: [
          module.store().createRecord('shallow', { str: 'deep-sync-string-1.shallow-string-0' }),
          module.store().createRecord('shallow', { str: 'deep-sync-string-1.shallow-string-1' })
        ],
        shallowsSync: [
          module.store().createRecord('shallow', { str: 'deep-sync-string-1.shallow-sync-string-0' }),
          module.store().createRecord('shallow', { str: 'deep-sync-string-1.shallow-sync-string-1' })
        ],
        deeps: [
          module.store().createRecord('deep', { str: 'deep-sync-string-1.deep-string-0' }),
          module.store().createRecord('deep', { str: 'deep-sync-string-1.deep-string-1' })
        ],
        deepsSync: [
          module.store().createRecord('deep', { str: 'deep-sync-string-1.deep-sync-string-0' }),
          module.store().createRecord('deep', { str: 'deep-sync-string-1.deep-sync-string-1' })
        ]
      })
    ]
  });

  copy = subject.copy();

  return copy.then(() => [subject, copy]);
}

moduleForModel('base', 'Mixin | Copyable | Base', {
  needs: ['model:shallow', 'model:deep'],
});

test('successfully copies complex model', function(assert) {
  Ember.run(() => {
    beforeAll(this).then(() => {
      assert.equal(copy.get('content.constructor.modelName'), 'base', 'returns correct model');
      assert.equal(copy.get('str'), 'base-string', 'copies attributes');
      [
        { relation: 'deep', compare: 'notEqual' },
        { relation: 'shallow', compare: 'equal' }
      ].forEach(({ relation, compare }) => {
        ['.content', 'Sync'].forEach(m1 => {
          //belongsTo
          assert.equal(copy.get(`${relation}${m1}.constructor.modelName`), relation, `copies ${relation}(belongsTo) async relation`);
          assert[compare](copy.get(`${relation}${m1}`), subject.get(`${relation}${m1}`), `copies ${relation}(belongsTo) async relation`);
        });
        ['s.content', 'sSync'].forEach(m1 => {
          ['firstObject', 'lastObject'].forEach(i => {
            //hasMany
            assert.equal(copy.get(`${relation}${m1}.${i}.constructor.modelName`), relation, `copies ${relation}(hasMany) async relation`);
            assert[compare](copy.get(`${relation}${m1}.${i}`), subject.get(`${relation}${m1}.${i}`),  `copies ${relation}(hasMany) async relation`);
          });
        });
      });
      [
        { relation: ['shallow', 'shallow'], compare: 'equal' },
        { relation: ['shallow', 'deep'], compare: 'equal' },
        { relation: ['deep', 'shallow'], compare: 'equal' },
        { relation: ['deep', 'deep'], compare: 'notEqual' },
      ].forEach(({ relation: [r1, r2], compare }) => {
        ['firstObject', 'lastObject'].forEach(i => {
          ['.content', 'Sync'].forEach(m1 => {
            ['s.content', 'sSync'].forEach(m2 => {
              //belongsTo.hasMany
              assert.equal(copy.get(`${r1}${m1}.${r2}${m2}.${i}.constructor.modelName`), r2, `copies ${r1}${m1} ${r2}${m2}.${i} class`);
              assert[compare](copy.get(`${r1}${m1}.${r2}${m2}.${i}`), subject.get(`${r1}${m1}.${r2}${m2}.${i}`), `copies ${r1}${m1} ${r2}${m2}.${i}`);
              //hasMany.belongsTo
              assert.equal(copy.get(`${r1}${m2}.${i}.${r2}${m1}.constructor.modelName`), r2, `copies ${r1}${m2}.${i}} ${r2}${m1} class`);
              assert[compare](copy.get(`${r1}${m2}.${i}.${r2}${m1}`), subject.get(`${r1}${m2}.${i}.${r2}${m1}`), `copies ${r1}${m2}.${i} ${r2}${m1}`);
            });
          });
          ['firstObject', 'lastObject'].forEach(ii => {
            ['s.content', 'sSync'].forEach(m1 => {
              ['s.content', 'sSync'].forEach(m2 => {
                //hasMany.hasMany
                assert.equal(copy.get(`${r1}${m1}.${i}.${r2}${m2}.${ii}.constructor.modelName`), r2, `copies ${r1}${m1}.${i} ${r2}${m2}.${ii} class`);
                assert[compare](copy.get(`${r1}${m1}.${i}.${r2}${m2}.${ii}`), subject.get(`${r1}${m1}.${i}.${r2}${m2}.${ii}`), `copies ${r1}${m1}.${i} ${r2}${m2}.${ii}`);
              });
            });
          });
        });
        ['.content', 'Sync'].forEach(m1 => {
          ['.content', 'Sync'].forEach(m2 => {
            //belongsTo.belongsTo
            assert.equal(copy.get(`${r1}${m1}.${r2}${m2}.constructor.modelName`), r2, `copies ${r1}${m1} ${r2}${m2} class`);
            assert[compare](copy.get(`${r1}${m1}.${r2}${m2}`), subject.get(`${r1}${m1}.${r2}${m2}`), `copies ${r1}${m2} ${r2}${m2}`);
          });
        });
      });
    });
  });
});
