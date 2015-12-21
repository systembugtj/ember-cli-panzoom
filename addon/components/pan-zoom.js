import Ember from 'ember';
import layout from '../templates/components/pan-zoom';

export default Ember.Component.extend({
  layout: layout,
  zooming: false,
  // options which match jquery.panzoom options.
  options: {
    eventNamespace: ".panzoom",
    transition: true,
    cursor: "move",
    disablePan: false,
    disableZoom: false,
    increment: 0.3,
    minScale: 0.4,
    maxScale: 5,
    rangeStep: 0.05,
    duration: 200,
    easing: "ease-in-out",
    contain: false,
    startTransform: undefined,
  },
  
  // computed alias for property
  eventNamespace: Ember.computed.alias("options.eventNamespace"),
  transition: Ember.computed.alias("options.transition"),
  cursor: Ember.computed.alias("options.eventNamespace"),
  disablePan: Ember.computed.alias("options.cursor"),
  disableZoom: Ember.computed.alias("options.disableZoom"),
  increment: Ember.computed.alias("options.increment"),
  minScale: Ember.computed.alias("options.minScale"),
  maxScale: Ember.computed.alias("options.maxScale"),
  rangeStep: Ember.computed.alias("options.rangeStep"),
  duration: Ember.computed.alias("options.duration"),
  easing: Ember.computed.alias("options.easing"),
  contain: Ember.computed.alias("options.contain"),
  startTransform: Ember.computed.alias("options.startTransform"),
  
  onZoomChanged: Ember.observer("zooming", function() {
    let zoomOut = this.get("zooming")
    this.get("$panzoom").panzoom('zoom', zoomOut, {
      increment: this.get("increment"),
      animate: false,
    });
  }),
  
  /*
   * @method observer option change, and set panzoom option
   */
  onOptionChanged: Ember.observer("options", function() {
    this.get("$panzoom")("options", this.get("options"));
  }),
  
  didInsertElement() {
    var _this = this;
    let panzoom = this.$().panzoom({
      eventNamespace  : this.get("eventNamespace"),
      transition      : this.get("transition"),
      cursor          : this.get("cursor"),
      disablePan      : this.get("disablePan"),
      disableZoom     : this.get("disableZoom"),
      increment       : this.get("increment"),
      minScale        : this.get("minScale"),
      maxScale        : this.get("maxScale"),
      rangeStep       : this.get("rangeStep"),
      duration        : this.get("duration"),
      easing          : this.get("easing"),
      contain         : this.get("contain"),
      startTransform  : this.get("startTransform"),
    })
    .on('onStart', function ($event, panzoom) {
      _this.sendAction('onStart', $event, panzoom);
    })
    .on('onChange', function ($event, panzoom) {
      _this.sendAction('onChange', panzoom);
    })
    .on('onPan', function ($event, panzoom) {
      _this.sendAction('onPan', panzoom);
    })
    .on('onEnd', function ($event, panzoom) {
      _this.sendAction('onEnd', panzoom);
    })
    .on('onReset', function ($event, panzoom) {
      _this.sendAction('onReset', panzoom);
    });
    
    this.set("$panzoom", panzoom);
    return panzoom;
  },
});