export default function() {
  this.get('/bars/:id');
  this.get('/bazs/:id');
  this.get('/foo-bars/:id');
  this.get('/foo-empties/:id');
  this.get('/foo-fixes/:id');
  this.get('/foos/:id');
  this.get('/multis/:id');
  this.get('/nested-lists/:id');

  this.get('/bars');
  this.get('/bazs');
  this.get('/foo-bars');
  this.get('/foo-empties');
  this.get('/foo-fixes');
  this.get('/foos');
  this.get('/multis');
  this.get('/nested-lists');


  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */
}
