import Ember from 'ember';
import layout from '../templates/components/pan-zoom';

export default Ember.Component.extend({
  layout: layout,
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
    
    this.$().on('mousewheel.focal', e => {
      e.preventDefault();
      var delta = e.delta || e.originalEvent.wheelDelta;
      var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
      this.get("$panzoom").panzoom('zoom', zoomOut, {
        increment: 0.1,
        animate: false,
        focal: e
      });
    });
    this.set("$panzoom", panzoom);
    return panzoom;
  },
});