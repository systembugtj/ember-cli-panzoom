/* jshint node: true */
'use strict';
var path = require('path');

module.exports = {
  name: 'ember-cli-panzoom',
  
  blueprintsPath: function() {
    return path.join(__dirname, 'blueprints');
  },

  included: function(app) {
    this._super.included(app);
    this.app.import(app.bowerDirectory + '/jquery.panzoom/dist/jquery.panzoom.js');
  }
};
