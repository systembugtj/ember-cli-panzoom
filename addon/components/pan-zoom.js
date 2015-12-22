import Ember from 'ember';
import layout from '../templates/components/pan-zoom';

export default Ember.Component.extend({
    layout: layout,
    zoomAnimation: false,
    mousewheel: true,
    // options which match jquery.panzoom options.
    classNames: ["pan-zoom"],
    options: {
        eventNamespace: ".panzoom",
        transition: true,
        cursor: "move",
        disablePan: false,
        disableZoom: false,
        increment: 0.5,
        minScale: 1,
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
    cursor: Ember.computed.alias("options.cursor"),
    disablePan: Ember.computed.alias("options.disablePan"),
    disableZoom: Ember.computed.alias("options.disableZoom"),
    increment: Ember.computed.alias("options.increment"),
    minScale: Ember.computed.alias("options.minScale"),
    maxScale: Ember.computed.alias("options.maxScale"),
    rangeStep: Ember.computed.alias("options.rangeStep"),
    duration: Ember.computed.alias("options.duration"),
    easing: Ember.computed.alias("options.easing"),
    contain: Ember.computed.alias("options.contain"),
    startTransform: Ember.computed.alias("options.startTransform"),
    
    /*
     * @method observer option change, and set panzoom option
     */
    onOptionChanged: Ember.observer("options", function () {
        this.get("$panzoom")("options", this.get("options"));
    }),
    
    onMouseWheel(e) {
        e.preventDefault();
        let delta = e.delta || e.originalEvent.wheelDelta;
        let zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
        this.get("$panzoom").panzoom('zoom', zoomOut, {
            increment: 0.1,
            animate: this.get("zoomAnimation"),
            focal: e
        });
    },
    
    onReset(options) {
        options = options || {};    
        this.get("$panzoom").panzoom("reset", options);  
    },
    
    didInsertElement() {
        this._super(...arguments);
        var _this = this;
        let $panzoom = this.$().panzoom({
            eventNamespace: this.get("eventNamespace"),
            transition: this.get("transition"),
            cursor: this.get("cursor"),
            disablePan: this.get("disablePan"),
            disableZoom: this.get("disableZoom"),
            increment: this.get("increment"),
            minScale: this.get("minScale"),
            maxScale: this.get("maxScale"),
            rangeStep: this.get("rangeStep"),
            duration: this.get("duration"),
            easing: this.get("easing"),
            contain: this.get("contain"),
            startTransform: this.get("startTransform"),
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
        if (this.get("mousewheel")) {
            let $parent = $panzoom.parent();
            $parent.on('mousewheel.focal', this.onMouseWheel.bind(this));
            this.set("mousewheelHandled", true);
        }
        this.set("$panzoom", $panzoom);
        
        // If parent controller has on, so we can listen to reset event.
        let parent = this.get("targetObject");
        if (parent && parent.on) {
            this.set("resetHandled", true);
            parent.on("reset", this.onReset.bind(this));
        }
    },
    
    willDestroyElement() {
        if (this.get("mousewheelHandled")) {
            let $parent = this.$().parent();
            $parent.off('mousewheel.focal', this.onMouseWheel.bind(this));
        }
        if (this.get("resetHandled")) {
            let parent = this.get("targetObject");
            parent.off("reset", this.onReset.bind(this));
        }
    },
});