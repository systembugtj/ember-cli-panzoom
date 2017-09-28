# ember-cli-panzoom

[![Build Status](https://travis-ci.org/systembugtj/ember-cli-panzoom.svg?branch=master)](https://travis-ci.org/systembugtj/ember-cli-panzoom)
[![npm version](https://badge.fury.io/js/ember-cli-panzoom.svg)](https://badge.fury.io/js/ember-cli-panzoom)
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-panzoom.svg)](http://emberobserver.com/addons/ember-cli-panzoom)


This is ember cli addon for jquery.panzoom usage as ember component.

0.2.0
Use jquery-panzoom npm package and support FastBoot.

0.1.16
Use jquery-panzoom bower package.

## Installation

```bash
ember install ember-cli-mousewheel
```

### pan-zoom

```hbs
{{#pan-zoom zooming=zooming}}
  <img src="https://static2.businessinsider.com/image/4f3433986bb3f7b67a00003c/a-parasite-found-in-cats-could-be-manipulating-our-brains.jpg">
{{/pan-zoom}}
```

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
