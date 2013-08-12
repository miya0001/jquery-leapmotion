/*! Backstretch - v2.0.4 - 2013-06-19
 * * http://srobbin.com/jquery-plugins/backstretch/
 * * Copyright (c) 2013 Scott Robbin; Licensed MIT */

(function($){

'use strict';

var is_focus = false;

$.leapmotion = function(config){

var defaults = {e: window};
var options = $.extend(defaults, config);

var controller = new Leap.Controller({
    enableGestures: true
});

controller.on('connect', function(){
    $(options.e).trigger('connect');
});

controller.on('deviceConnected', function(){
    $(options.e).trigger('deviceConnected');
});

controller.on('deviceDisconnected', function(){
    $(options.e).trigger('deviceDisconnected');
});

controller.on('focus', function(){
    $(options.e).trigger('focus');
});

controller.on('blur', function(){
    $(options.e).trigger('blur');
});

controller.on('animationFrame', function(obj){
    if (is_focus === true) {
        if (obj.pointables.length) {
            $(options.e).trigger('pointables', obj);
        } else {
            $(options.e).trigger('pointablesout', obj);
        }
        if (obj.hands.length) {
            $(options.e).trigger('hands', obj);
        } else {
            $(options.e).trigger('handsout', obj);
        }
        if (obj.fingers.length) {
            $(options.e).trigger('fingers', obj);
        } else {
            $(options.e).trigger('fingersout', obj);
        }
        if (obj.tools.length) {
            $(options.e).trigger('tools', obj);
        } else {
            $(options.e).trigger('toolsout', obj);
        }
        if (obj.gestures.length > 0) {
            $(options.e).trigger('gesture', obj);
            obj.gestures.forEach(function(gesture) {
                $(options.e).trigger(gesture.type, gesture);
                $(options.e).trigger(gesture.type + gesture.state, gesture);
            });
        }
    }
});

controller.connect();

$(options.e).bind('focus', function(){ is_focus = true; });
$(options.e).bind('blur', function(){ is_focus = false; });

$(options.e).bind('circle', function(e, gesture){
    if (gesture.normal[2] < 0) {
        $(options.e).trigger('circleright', gesture);
    } else {
        $(options.e).trigger('circleleft', gesture);
    }
});

$(options.e).bind('swipe', function(e, gesture){
    var dir = gesture.direction;
    if (Math.abs(dir[0]) > Math.abs(dir[1])) { // horizontal
        if (dir[0] > 0) {
            $(options.e).trigger('swiperight', gesture);
        } else {
            $(options.e).trigger('swipeleft', gesture);
        }
    } else if (Math.abs(dir[0]) < Math.abs(dir[1])) { // vertical
        if (dir[1] > 0) {
            $(options.e).trigger('swipetop', gesture);
        } else {
            $(options.e).trigger('swipebottom', gesture);
        }
    }
});

}; // end function

})(jQuery);
