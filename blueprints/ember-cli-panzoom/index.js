module.exports = {
  normalizeEntityName: function() {
  },

  afterInstall: function() {
    return this.addAddonToProject('ember-cli-mousewheel').then(() => {
      return this.addBowerPackageToProject('jquery.panzoom'); 
    });
     
  }
};