# web-audio-api-autostart

Beginning with Chrome 66, [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) is initialized to the `suspended` state, and no audio processing is done until [AudioContext.resume()](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/resume) is called as part of a [user triggered action](https://html.spec.whatwg.org/multipage/interaction.html#triggered-by-user-activation) (e.g. in response to a trusted click event). To work around this problem, you either need to ask the user to perform a meaningful action, such as a click, or wait until this happens.

If this is not feasible to implement in your app, you can use `web-audio-api-autostart`, which makes the AudioContext simply try to auto-start (auto-resume) itself when created, or show a simple and tasteful button to let the user start (resume) the AudioContext playback.

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
