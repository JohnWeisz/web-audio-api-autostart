# web-audio-api-autostart

[Beginning with Chrome 66](https://bugs.chromium.org/p/chromium/issues/detail?id=807017), if creating an AudioContext before the document has received a user gesture, the AudioContext is initialized to the *suspended* state, and no audio processing is done until `AudioContext.resume()` is called, either in response to a user-triggered action (such as a trusted click event), or after the document has received a user gesture, depending on autoplay policy. In other words, it's no longer possible to start an AudioContext completely automatically to play sounds.

This is a severe breaking change to several Web Audio API-based apps, and to work around this, you either need to ask the user to perform a meaningful action, such as a click, or wait until this happens (again, depending on autoplay policy).

`web-audio-api-autostart` simply injects these requirements into the construction of AudioContext. It will try to auto-start the AudioContext when created, or show a simple and tasteful [snackbar](https://material.io/guidelines/components/snackbars-toasts.html) to let the user start (resume) the AudioContext playback.

## How to use

Include `autostart.js` through a script tag before your app code:

```html
<script src="autostart.js"></script>
```

## Customize

The button can be customized through the `audioctx-resume-btn` CSS class, for example:

```css
.audioctx-resume-btn {
    font-size: 22px !important;
}
```

Some properties need the `!important` keyword to override inline styles.
