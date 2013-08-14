(function($){

'use strict';

$.extend({

    leapmotion: function(config){

        var is_focus = true;
        var defaults = {
            element: window,
            cursorSpeed: 1.5
        };
        var options = $.extend(defaults, config);

        var lm = new leapMotion({
            cursorSpeed: options.cursorSpeed
        });

        Leap.Frame.prototype.pointerOffset = function(){
            var pointers = [];
            for (var i = 0; i < this.pointables.length; i++) {
                var pos = this.pointables[i].tipPosition;
                pointers[pointers.length] = lm.getOffset(this.interactionBox, pos);
            }

            return pointers;
        }

        var controller = new Leap.Controller({
            enableGestures: true
        });

        controller.on('connect', function(){
            $(options.element).trigger('connect');
        });

        controller.on('deviceConnected', function(){
            $(options.element).trigger('deviceConnected');
        });

        controller.on('deviceDisconnected', function(){
            $(options.element).trigger('deviceDisconnected');
        });

        controller.on('focus', function(){
            $(options.element).trigger('focus');
        });

        controller.on('blur', function(){
            $(options.element).trigger('blur');
        });

        controller.on('animationFrame', function(frame){
            if (is_focus === true) {
                if (frame.pointables.length) {
                    $(options.element).trigger('pointables', frame);
                } else {
                    $(options.element).trigger('pointablesout', frame);
                }
                if (frame.hands.length) {
                    $(options.element).trigger('hands', frame);
                } else {
                    $(options.element).trigger('handsout', frame);
                }
                if (frame.fingers.length) {
                    $(options.element).trigger('fingers', frame);
                } else {
                    $(options.element).trigger('fingersout', frame);
                }
                if (frame.tools.length) {
                    $(options.element).trigger('tools', frame);
                } else {
                    $(options.element).trigger('toolsout', frame);
                }
                if (frame.gestures.length > 0) {
                    $(options.element).trigger('gesture', frame);
                    frame.gestures.forEach(function(gesture) {
                        $(options.element).trigger(gesture.type, gesture);
                        $(options.element).trigger(
                            gesture.type + gesture.state,
                            gesture
                        );
                    });
                }
            }
        });

        controller.connect();

        $(options.element).bind('focus', function(){
            is_focus = true;
        });

        $(options.element).bind('blur', function(){
            is_focus = false;
        });

        $(options.element).bind('circle', function(e, gesture){
            if (gesture.normal[2] < 0) {
                $(options.element).trigger('circleright', gesture);
            } else {
                $(options.element).trigger('circleleft', gesture);
            }
        });

        $(options.element).bind('swipe', function(e, gesture){
            var dir = gesture.direction;
            if (Math.abs(dir[0]) > Math.abs(dir[1])) { // horizontal
                if (dir[0] > 0) {
                    $(options.element).trigger('swiperight', gesture);
                } else {
                    $(options.element).trigger('swipeleft', gesture);
                }
            } else if (Math.abs(dir[0]) < Math.abs(dir[1])) { // vertical
                if (dir[1] > 0) {
                    $(options.element).trigger('swipetop', gesture);
                } else {
                    $(options.element).trigger('swipebottom', gesture);
                }
            }
        });

    } // end function

}); // end extend

var leapMotion = function(config)
{
    var defaults = {
        cursorSpeed: 1.5
    };

    this.options = $.extend(defaults, config);
}

leapMotion.prototype.getOffset = function(interectionBox, vector)
{
    var center = interectionBox.center[1];

    var x = vector[0];
    var y = vector[1];
    var z = vector[2];

    var w = $(window).width();
    var h = $(window).height();

    var px = 0;
    if (w > h) {
        px = w  / (center * 2) * this.options.cursorSpeed;
    } else {
        px = h / (center * 2) * this.options.cursorSpeed;
    }

    var posleft = (w / 2) + (px * x * 2);
    var postop = (h / 2) + ((center - y) * px);

    return {
        top: postop,
        left: posleft
    }
}

})(jQuery);
