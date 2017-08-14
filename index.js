/* jshint node: true */
'use strict';
let path = require('path');
let mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-panzoom',

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  treeForVendor: function(tree) {
    let jqueryMousewheel = path.join(this.project.nodeModulesPath, 'jquery-mousewheel');
    let jqueryPanzoom = path.join(this.project.nodeModulesPath, 'jquery.panzoom/dist');

    tree = (tree) ? mergeTrees([ tree, jqueryMousewheel, jqueryPanzoom]) : mergeTrees([jqueryMousewheel, jqueryPanzoom]);

    return tree;
  },

  included: function(app) {
    this._super.included(app);
    this.app.import("vendor/ie-touch.js");

    this.app.import('vendor/jquery.mousewheel.js');
    this.app.import('vendor/jquery.panzoom.js');
  }
};
