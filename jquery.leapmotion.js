/*! Backstretch - v2.0.4 - 2013-06-19
 * * http://srobbin.com/jquery-plugins/backstretch/
 * * Copyright (c) 2013 Scott Robbin; Licensed MIT */

(function($){

'use strict';

var is_focus = true;

$.extend({leapmotion: function(config){

var defaults = {element: window};
var options = $.extend(defaults, config);

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

controller.on('animationFrame', function(obj){
    if (is_focus === true) {
        if (obj.pointables.length) {
            $(options.element).trigger('pointables', obj);
        } else {
            $(options.element).trigger('pointablesout', obj);
        }
        if (obj.hands.length) {
            $(options.element).trigger('hands', obj);
        } else {
            $(options.element).trigger('handsout', obj);
        }
        if (obj.fingers.length) {
            $(options.element).trigger('fingers', obj);
        } else {
            $(options.element).trigger('fingersout', obj);
        }
        if (obj.tools.length) {
            $(options.element).trigger('tools', obj);
        } else {
            $(options.element).trigger('toolsout', obj);
        }
        if (obj.gestures.length > 0) {
            $(options.element).trigger('gesture', obj);
            obj.gestures.forEach(function(gesture) {
                $(options.element).trigger(gesture.type, gesture);
                $(options.element).trigger(gesture.type + gesture.state, gesture);
            });
        }
    }
});

controller.connect();

$(options.element).bind('focus', function(){ is_focus = true; });
$(options.element).bind('blur', function(){ is_focus = false; });

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

}}); // end extend function

})(jQuery);
