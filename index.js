/* jshint node: true */
'use strict';
var path = require('path');
const nodeModulesPath = require('node-modules-path');

module.exports = {
  name: 'ember-cli-panzoom',

  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  included: function(app) {
    this._super.included(app);
    this.app.import("vendor/ie-touch.js");

    this.app.import(this.project.nodeModulesPath + '/jquery-mousewheel/jquery.mousewheel.js');
    this.app.import(this.project.nodeModulesPath + '/jquery.panzoom/dist/jquery.panzoom.min.js');
  }
};
