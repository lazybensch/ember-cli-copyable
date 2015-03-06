# Ember-cli-copyable
[![Build Status](https://travis-ci.org/lazybensch/ember-cli-copyable.svg)](https://travis-ci.org/lazybensch/ember-cli-copyable)
[![Code Climate](https://codeclimate.com/github/lazybensch/ember-cli-copyable/badges/gpa.svg)](https://codeclimate.com/github/lazybensch/ember-cli-copyable)

This addon provides you with a mixin, that can deeply copy your ember data models without hassle. It figures out what attributes and relations exist on your model and is smart enough to resolve not loaded relations if needed.

```javascript
copy = record.copy(options);

copy.then(callback);
```

## shallow and deep copying

If the record you want to copy has a child, by default `ember-cli-copyable` will create a **shallow copy**. That means afterwards two records will exist *(the original and the copy)* but both will point to the very same child. If that child extends the `ember-cli-copyable` mixin aswell however, the addon will create a **deep copy**, where the copy of your record will point to a newly created child, which itself is a copy *(so two new objects where created)*. You can have a mix of shallow and deep relations in your record and the copy will be generated accordingly. This might sound a bit confusing but will be very clear once you have a look at the examples below.

## sync and async relations

`ember-cli-copyable` does not care if the data that needs to be copied is already embedded, or still has to be fetched from your backend *(or both!)*. It will simply resolve and then copy any async child and generates a fully resolved copy for you.

## simple example

Before we dive into how you can configure the way your record is copied lets refresh ourselfs with a simple code example. Assume the following relations: Every account has a favorite song, and multiple playlists, which in turn host a number of songs. Now lets copy one of those accounts: Lets assume our `currentAccount` has five playlists and a favorite song.


```javascript
import Copyable from 'ember-cli-copyable';

Account = DS.Model.extend( Copyable, {
  name: DS.attr('string'),
  playlists: DS.hasMany('playList'),
  favoriteSong: DS.belongsTo('song')
});

PlayList = DS.Model.extend( Copyable, {
  name: DS.attr('string'),
  songs: DS.hasMany('song'),
});

//notice how Song does not extend Copyable
Song = DS.Model.extend({
  name: DS.attr('string'),
  artist: DS.belongsTo('artist'),
});
```


```javascript
this.get('currentAccount.id') // => 1
this.get('currentAccount.name') // => 'lazybensch'
this.get('currentAccount.playlists.length') // => 5
this.get('currentAccount.playlists.firstObject.id') // => 1
this.get('currentAccount.favoriteSong.id') // => 1

this.get('currentAccount').copy().then(function(copy) {

  copy.get('id') // => 2 (differs from currentAccount)
  copy.get('name') // => 'lazybensch'
  copy.get('playlists.length') // => 5
  copy.get('playlists.firstObject.id') // => 6 (differs from currentAccount)
  copy.get('favoriteSong.id') // => 1 (the same object as in currentAccount.favoriteSong)

});
```

Once the copy method resolved it created a new account record for us. It also created 5 new playlist objects for us which attributes itself are copies of the original playlists. Notice that we never extended Songs with the `Copyable Mixin` because we really dont want to copy songs ever, its enough to copy the reference to them. Sometimes however it is not as simple. Lets assume that although in this particular usecase, we *dont* want to copy the songs, maybe in another part of your application you do want to do that. `ember-cli-copyable` lets you configure the whole copying process as demonstrated in the next section.



## configuration

For those cases where you need total control over how your record should be copied, you are able to pass an options hash to the `copy` in which you can specify what relations and attributes should be excluded from the copy process. You can also overwrite attributes this way.

### simple options example

Imagine the following setup: Every `Event` has a date at which it takes place and many participants that are going to join.

```javascript
import Copyable from 'ember-cli-copyable';

Event = DS.Model.extend( Copyable, {
  date: DS.attr('date'),
  participants: DS.hasMany('User')
});

User = DS.Model.extend({
  name: DS.attr('string'),
});
```

You could now copy an event, assigning the same group of participants but overwriting its date to today.

```javascript
today = moment().format();

event.copy({date: today})
```

### nested options example

Lets look at another example of customizing your copy.

```javascript
import Copyable from 'ember-cli-copyable';


Foo = DS.Model.extend( Copyable, {
  property: DS.attr('string')
});

Bar = DS.Model.extend( Copyable, {
  foo: DS.belongsTo('foo')
});

Baz = DS.Model.extend( Copyable, {
  bar: DS.belongsTo('bar'),
  property: DS.attr('string')
});

```

`baz.copy()` by default will create three new records, a copy of `baz` a copy of its `bar` and a copy of the `foo` model.

```javascript
baz.copy({bar: null})

```
creates a copy of baz with baz.get('bar') === null


```javascript
baz.copy({bar: {foo: null}})
```
creates a copy of baz and a copy of bar with baz.get('bar.foo') === null


```javascript
baz.copy({property: null, {bar: {foo: {property: 'asdf'}}}})
```

creates a copy of `baz` with its property set to null, also creates a copy of `bar` and a copy of `foo`, but foo.get('property') will be overwritten with `'asdf'`


## coming up

For the next days I plan a few backwards compatible updates, including:

* allow user to overwrite hasMany relations
* allow user to force shallow copying on copyable models
* detect circular relations

## Installation

To use this addon in your project, just type:
```
$ ember install:addon ember-cli-copyable
```
or for older versions of ember-cli *(pre 1.4.0)*:
```
$ npm install --save-dev ember-cli-copyable
```
and then import the mixin wherever you need it:
```
import Copyable from 'ember-cli-copyable;
```

## Contributing

Im happy about everyone that wants to contribute.

* `git clone https://github.com/lazybensch/ember-cli-sync-for-each`
* `cd ember-cli-sync-for-each`
* `npm install`
* `bower install`
* `ember test`
