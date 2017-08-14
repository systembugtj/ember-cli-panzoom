module.exports = {
  normalizeEntityName: function() {
  },

  afterInstall: function() {
    return this.addPackagesToProject([
      { name: 'jquery-mousewheel' },
      { name: 'jquery.panzoom' }
    ]);
  }
};
