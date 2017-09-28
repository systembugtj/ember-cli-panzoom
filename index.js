/* eslint-env node */
'use strict';
var path = require('path');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var BroccoliDebug = require('broccoli-debug');
var fbTransform = require('fastboot-transform');

module.exports = {
  name: 'ember-cli-panzoom',

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  treeForVendor: function(vendorTree) {
    var panzoomDir = path.dirname(require.resolve('jquery.panzoom'));

    var panzoomTree = new Funnel(panzoomDir, {
      files: ['jquery.panzoom.js', 'jquery.panzoom.min.js'],
      destDir: 'jquery.panzoom'
    });
    panzoomTree = new BroccoliDebug(
      panzoomTree, 'ember-cli-panzoom:panzoom-tree'
    );

    // Make sure this does not conflict with the same file name in
    // "vendor" folder. For this purpose put ie-touch.js in vendor tree
    // into sub-folder.
    var ieTouchTree = new Funnel(path.join(__dirname, 'vendor'), {
      files: ['ie-touch.js'],
      destDir: 'ie-touch'
    });
    ieTouchTree = new BroccoliDebug(ieTouchTree, 'ember-cli-panzoom:ie-touch');

    if (vendorTree) {
      vendorTree = mergeTrees([vendorTree, panzoomTree, ieTouchTree]);
    } else {
      vendorTree = mergeTrees(panzoomTree, ieTouchTree);
    }

    return new BroccoliDebug(
      fbTransform(vendorTree), 'ember-cli-panzoom:vendor-tree'
    );
  },

  included: function(app) {
    this._super.included(app);

    app.import({
      development: 'vendor/jquery.panzoom/jquery.panzoom.js',
      production: 'vendor/jquery.panzoom/jquery.panzoom.min.js'
    });
    app.import('vendor/ie-touch/ie-touch.js');
  }
};
