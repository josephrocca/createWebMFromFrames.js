# createWebMFromFrames.js
Creates a WebM video from a series of frames using the new WebCodecs API.

```js
import createWebMFromFrames from "https://deno.land/x/create_webm_from_frames@v0.0.4/mod.js";

let fileHandle = await window.showSaveFilePicker({
  startIn: 'videos',
  suggestedName: 'myVideo.webm',
  types: [{
    description: 'Video File',
    accept: {'video/webm' :['.webm']},
  }],
});

let fileWritableStream = await fileHandle.createWritable();

let webm = createWebMFromFrames(fileWritableStream, {width:config.codedWidth, height:config.codedHeight, bitrate:10e6});

// The frames should be a `VideoFrame` which can be created from an image/canvas/etc. --> https://developer.mozilla.org/en-US/docs/Web/API/VideoFrame/VideoFrame
webm.addFrame(frame1);
webm.addFrame(frame2);

await webm.save();
```

* Demo: https://josephrocca.github.io/createWebMFromFrames.js/demo
* All credit for this script goes to [Nicholas Sherlock and jimbankoski](https://w3c.github.io/webcodecs/samples/capture-to-file/webm-writer2.js).
* For some reason the resulting WebM videos don't play properly in VLC, but they do play properly in Chrome and Firefix (I haven't tested any others). There might be updates on this [here](https://github.com/w3c/webcodecs/issues/332#issuecomment-1341489961).

