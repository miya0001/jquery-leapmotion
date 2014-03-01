# jquery-leapmotion

jquery-leapmotion is a simple jQuery plugin that allows you to add custom event handler for the Leap Motion.

## Setup

Include the jQuery library (version 1.8.3 or newer), leapjs (version 0.2.0) and jquery-leapmotion plugin files in your webpage (preferably at the bottom of the page, before the closing BODY tag):

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script src="//js.leapmotion.com/0.2.0/leap.min.js"></script>
<script src="//jqueryleapmotion.s3.amazonaws.com/jquery.leapmotion.min.js"></script>
```

## Events

This plugin add custom events to the window object.
If you want to use these events, please place the code like below.

```html
<script>
  $.leapmotion();
  $(window).bind('swipe', function(e, gesture){
    console.log(gesture);
  });
</script>
```

### Device Events

- connect
- deviceConnected
- deviceDisconnected
- focus
- blur

```html
<script>
  $.leapmotion();
  $(window).bind('deviceConnected', function(e){
    console.log("Leap Motion Connected");
  });
</script>
```

### Frame Events

- pointables
- pointablesout
- hands
- handsout
- fingers
- fingersout
- tools
- toolsout

```html
<script>
  $.leapmotion();
  $(window).bind('pointables', function(e, frame){
    console.log("Points are "+frame.pointables.length);
  });
</script>
```

### Gesture Events

- gesture
- circle
- circlestart
- circleupdate
- circlestop
- circleright
- circleleft
- swipe
- swipestart
- swipeupdate
- swipestop
- swipeleft
- swiperight
- swipetop
- swipebottom
- keytap
- keytapstart
- keytapupdate
- keytapstop
- screentap
- screentapstart
- screentapupdate
- screentapstop

```html
<script>
  $.leapmotion();
  $(window).bind('swipestop', function(e, gesture){
    jQuery("body:first").animate({scrollTop: 0}, 500);
  });
</script>
```


## Changelog

### Version 0.1.0

* First release
