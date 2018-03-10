# web-audio-api-autostart

[Beginning with Chrome 66](https://bugs.chromium.org/p/chromium/issues/detail?id=807017), creating an AudioContext before the document has received a user-gesture will initialize it to the *suspended* state, and no audio processing can be done until `AudioContext.resume()` is called, either in response to a user-triggered action (such as a trusted click event), or after the document has received a user gesture, depending on autoplay policy. That is, it's no longer possible to start an AudioContext completely automatically to play sounds.

This is a severe breaking change to several Web Audio API-based apps, and to work around this, you either need to ask the user to perform a meaningful action (such as a click), start chrome with `--autoplay-policy=no-user-gesture-required`, or wait until a gesture happens (again, depending on autoplay policy).

`web-audio-api-autostart` simply injects these requirements into the construction of the AudioContext itself. It will try to auto-start the AudioContext when created, or show a simple and tasteful, customizable [snackbar](https://material.io/guidelines/components/snackbars-toasts.html) to let the user start (resume) the AudioContext playback manually.

## How to use

Include `autostart.js` through a script tag before your app code:

```html
<script src="autostart.js"></script>
```

## Customize

The button label can be customized by the `data-btn-label` attribute on the script tag:

```html
<script src="autostart.js" data-btn-label="Start"></script>
```

By default, the button will be shown near immediately if required. To attempt to wait until `AudioContext.resume()` can be called without a direct user-gesture, add the `data-timeout` attribute, specifying the wait duration in milliseconds:

```html
<script src="autostart.js" data-timeout="4000"></script>
```

The button appearance can be customized through the `audioctx-resume-btn` CSS class, for example:

```css
.audioctx-resume-btn {
    font-size: 22px !important;
}
```

Some properties need the `!important` keyword to override inline styles.
