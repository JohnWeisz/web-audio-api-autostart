if (typeof AudioContext !== "undefined")
{
    AudioContext = (function (AudioContext)
    {
        var buttonText = document.currentScript.getAttribute("data-btn-label") || "Start audio";
        var timeout = parseFloat(document.currentScript.getAttribute("data-timeout")) || 0;
        var OriginalAudioContextCtor = AudioContext;

        // Replace the 'AudioContext' constructor with one that automatically calls the 'resume()' method.
        // If needed, this will show a "toast" message near the bottom of the screen.
        AudioContext = function ()
        {
            let audioCtx = new OriginalAudioContextCtor();

            if (audioCtx.state === "running")
            {
                return audioCtx;
            }

            // It could be that 'new AudioContext()' is already called in response to a user triggered action, in which case we don't
            // need to show an initializer toast at all. Try doing this first.
            audioCtx.resume();

            window.setTimeout(function ()
            {
                if (audioCtx.state === "suspended")
                {
                    // Alright, this didn't work, so let's try again through the toast or by waiting.
                    if (timeout > 0)
                    {
                        // Wait for a user gesture to happen in the document (can work with kDocumentUserActivationRequired policy).
                        waitAutoStart(audioCtx, performance.now() + timeout, function ()
                        {
                            // Fail callback, could not auto-start.
                            showToast(buttonText, function ()
                            {
                                audioCtx.resume();
                            });
                        });
                    }
                    else
                    {
                        showToast(buttonText, function ()
                        {
                            audioCtx.resume();
                        });
                    }
                }
            }, 100);

            return audioCtx;
        }
        
        function showToast(buttonText, callback)
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
            toast.innerHTML = buttonText;
            toast.className = "audioctx-resume-btn";

            window.setTimeout(function ()
            {
                document.body.appendChild(toast);

                toast.addEventListener("click", function ()
                {
                    callback();
                    document.body.removeChild(toast);
                });
            }, 0);
        }

        function waitAutoStart(audioCtx, deadline, fail)
        {
            audioCtx.resume();

            if (audioCtx.state === "suspended")
            {
                // Still no good, keep trying if we have time.
                if (performance.now() < deadline + 100)
                {
                    window.setTimeout(function ()
                    {
                        waitAutoStart(audioCtx, deadline, fail);
                    }, 100);
                }
                else
                {
                    fail();
                }
            }
        }

        return AudioContext;
    })(AudioContext);
}
