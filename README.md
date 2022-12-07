# createWebMFromFrames.js
Creates a WebM video from a series of frames using the new WebCodecs API.

```js
import createWebMFromFrames from "https://deno.land/x/create_webm_from_frames@v0.0.1/mod.js";

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

webm.addFrame(frame1);
webm.addFrame(frame2);

await webm.save();
```

* Demo: https://josephrocca.github.io/createWebMFromFrames.js/demo
* All credit for this script goes to [Nicholas Sherlock and jimbankoski](https://w3c.github.io/webcodecs/samples/capture-to-file/webm-writer2.js).

