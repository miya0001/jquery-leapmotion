# jquery-leapmotion

jquery-leapmotion is a simple jQuery plugin that allows you to add custom event handler for the Leap Motion.

## Setup

Include the jQuery library (version 1.8.3 or newer), leapjs (version 0.2.0) and jquery-leapmotion plugin files in your webpage (preferably at the bottom of the page, before the closing BODY tag):

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script src="//js.leapmotion.com/0.2.0/leap.min.js"></script>
<script src="//jqueryleapmotion.s3.amazonaws.com/jquery.leapmotion.min.js"></script>

<script>
  // To attach Backstrech as the body's background
  $.leapmotion();
  $(window).bind('swipe', function(e, gesture){
    console.log(gesture);
  });
</script>
```

## Events

- Connect
- deviceConnected
- deviceDisconnected
- focus
- blur
- pointables
- pointablesout
- hands
- handsout
- fingers
- fingersout
- tools
- toolsout
- gesture
- circle
- circleright
- circleleft
- swipe
- swipeleft
- swiperight
- swipetop
- swipebottom
- keytap
- screentap

## Changelog

### Version 0.1.0

* First release
