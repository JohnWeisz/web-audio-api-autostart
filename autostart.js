if (typeof AudioContext !== "undefined")
{
    AudioContext = (function (AudioContext)
    {
        var OriginalAudioContext = AudioContext;

        // Replace the 'AudioContext' constructor with one that automatically calls the 'resume()' method.
        // If needed, this will show a "toast" message near the bottom of the screen.
        AudioContext = function ()
        {
            let audioCtx = new OriginalAudioContext();

            if (audioCtx.state === "running")
            {
                // Other browsers don't need this at this time, so we can return straight away, no initialization needed.
                return audioCtx;
            }
            
            // It could be that 'new AudioContext()' is already called in response to a user triggered action, in which case we don't
            // need to show an initializer toast at all. Try doing this first.
            audioCtx.resume().then(function ()
            {
                if (audioCtx.state === "suspended")
                {
                    // Alright, this didn't work, so let's try again through the toast.
                    showToast(function ()
                    {
                        audioCtx.resume();
                    });
                }
            }).catch(function ()
            {
                showToast(function ()
                {
                    audioCtx.resume();
                });
            });

            return audioCtx;
        }

        function showToast(callback)
        {
            var toast = document.createElement("div");
            toast.style.position = "absolute";
            toast.style.right = "0px";
            toast.style.bottom = "0px";
            toast.style.zIndex = "999";
            toast.style.padding = "16px";
            toast.style.width = "100%";
            toast.style.textAlign = "center";
            toast.style.background = "rgb(60,60,60)";
            toast.style.boxSizing = "border-box";
            toast.style.fontWeight = "100";
            toast.style.color = "#eee";
            toast.style.fontSize = "16px";
            toast.style.boxShadow = "0 3px 6px rgba(0,0,0,0.4)";
            toast.style.cursor = "pointer";
            toast.innerHTML = "Start audio";
            toast.className = "audioctx-resume-btn";

            document.body.appendChild(toast);

            toast.addEventListener("click", function ()
            {
                callback();
                document.body.removeChild(toast);
            });
        }

        return AudioContext;
    })(AudioContext);
}
