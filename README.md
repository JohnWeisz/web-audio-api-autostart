# web-audio-api-autostart

Beginning with Chrome 66, `AudioContext` is initialized to the `suspended` state, and no audio processing is done until `AudioContext.resume()` is called as part of a user triggered action (e.g. in response to a trusted click event).

`web-audio-api-autostart` makes the AudioContext simply try to auto-resume itself, or show a simple and tasteful button to let the user start (resume) the AudioContext playback.
