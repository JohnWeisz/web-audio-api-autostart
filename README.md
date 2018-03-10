# web-audio-api-autostart

Beginning with Chrome 66, [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) is initialized to the `suspended` state, and no audio processing is done until [AudioContext.resume()](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/resume) is called as part of a user triggered action (e.g. in response to a trusted click event).

`web-audio-api-autostart` makes the AudioContext simply try to auto-start (auto-resume) itself when created, or show a simple and tasteful button to let the user start (resume) the AudioContext playback.

## How to use

Include `autostart.js` through a script tag before your app code:

```html
<script src="autostart.js"></script>
```
